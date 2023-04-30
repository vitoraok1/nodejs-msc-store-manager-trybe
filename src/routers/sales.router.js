const express = require('express');
const salesController = require('../controllers/salesController');
const {
  validateProductIdFormat, validateQuantityFieldFormat, validateProductIdExistence,
} = require('../middlewares/validateSalesFields');

const router = express.Router();

router.get('/', salesController.getAll);

router.get('/:id', salesController.getById);

router.post(
  '/', validateProductIdFormat, validateQuantityFieldFormat, validateProductIdExistence,
  salesController.registerNewSale,
);

module.exports = router;