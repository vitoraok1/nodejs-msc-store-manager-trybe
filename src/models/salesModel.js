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

module.exports = { getAll, getById };