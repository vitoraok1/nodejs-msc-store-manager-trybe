const salesService = require('../services/salesService');

const getAll = async (req, res) => {
  const { message } = await salesService.getAll();
  return res.status(200).json(message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getById(id);
  if (type) return res.status(404).json({ message: 'Sale not found' });
  return res.status(200).json(message);
};

module.exports = { getAll, getById };