const productsModel = require('../models/productsModel');

const validateProductIdFormat = (req, res, next) => {
  const newSales = req.body;
  
  if (newSales.some(({ productId }) => productId === undefined)) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  next();
};

const validateQuantityFieldFormat = (req, res, next) => {
  const newSales = req.body;

  if (newSales) {
    if (newSales.some(({ quantity }) => quantity === undefined)) {
      return res.status(400).json({ message: '"quantity" is required' });
    }

    if (newSales.some(({ quantity }) => quantity <= 0)) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
  }

  next();
};

const validateProductIdExistence = async (req, res, next) => {
  const newSales = req.body;

  const allProduct = await productsModel.getAll();
  const validIds = allProduct.map(({ id }) => id);

  const checkExistence = newSales.every(({ productId }) => validIds.includes(productId));

  if (!checkExistence) {
    return res.status(404)
      .send({ message: 'Product not found' });
  }

  next();
};

module.exports = {
  validateProductIdFormat, validateQuantityFieldFormat, validateProductIdExistence,
};