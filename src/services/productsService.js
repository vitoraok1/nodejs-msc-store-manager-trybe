const productsModel = require('../models/productsModel');

const getAll = async () => {
  const products = await productsModel.getAll();
  return { type: null, message: products };
};

const getById = async (id) => {
  const product = await productsModel.getById(id);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: product };
};

const create = async (product) => {
  const newProduct = await productsModel.create(product);
  return { type: null, message: { id: newProduct, name: product } };
};

const update = async (name, id) => {
  const updateProduct = await productsModel.update(name, id);

  if (updateProduct[0]
    .changedRows === 0) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  
  return { type: null, message: { id, name } };
};

module.exports = { getAll, getById, create, update };