const productsService = require('../services/productsService');

const getAll = async (req, res) => {
  const { message } = await productsService.getAll();
  return res.status(200).json(message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.getById(id);
  if (type) return res.status(404).json({ message: 'Product not found' });
  return res.status(200).json(message);
};

const create = async (req, res) => {
  const { name } = req.body;
  const { message } = await productsService.create(name);
  return res.status(201).json(message);
};

const update = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const { type, message } = await productsService.update(name, Number(id));
  if (type) return res.status(404).json({ message: 'Product not found' });
  return res.status(200).json(message);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const { type } = await productsService.remove(Number(id));
  if (type) return res.status(404).json({ message: 'Product not found' });
  return res.status(204).end();
};

module.exports = { getAll, getById, create, update, remove };