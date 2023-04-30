const connection = require('./connection');

const getAll = async () => {
  const [sales] = await connection.execute(
    `SELECT * FROM StoreManager.sales_products AS sp
    JOIN StoreManager.sales AS s ON s.id = sp.sale_id;`,
  );
  return sales;
};

const getById = async (id) => {
  const [saleProduct] = await connection
    .execute(`SELECT * FROM StoreManager.sales_products AS sp 
    JOIN StoreManager.sales AS s ON sp.sale_id = s.id
    WHERE id = ?;`, [id]);
  return saleProduct;
};

const registerNewSale = async (sales) => {
  const [{ insertId }] = await connection
    .execute('INSERT INTO StoreManager.sales (date) VALUES (NOW());');
  
  sales.forEach(({ productId, quantity }) => {
    connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)  values (?, ?, ?);',
      [insertId, productId, quantity],
    );
  });
  
  const result = {
    id: insertId,
    itemsSold: sales,
  };
  
  return result;
};

module.exports = { getAll, getById, registerNewSale };