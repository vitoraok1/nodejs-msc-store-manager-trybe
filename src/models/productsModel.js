const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM StoreManager.products;');
  return products;
};

const getById = async (id) => {
  const [[product]] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE id = ?;', [id]);
  return product;
};

const create = async (product) => {
  const [{ insertId }] = await connection
    .execute('INSERT INTO StoreManager.products (name) VALUES (?);', [product]);
  return insertId;
};

const update = async (name, id) => {
  const result = await connection
    .execute('UPDATE StoreManager.products SET name = ? WHERE id = ?;', [name, id]);
  return result;
};

module.exports = { getAll, getById, create, update };