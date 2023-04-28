const salesModel = require('../models/salesModel');

const getAll = async () => {
  const sales = await salesModel.getAll();
  const saleFormat = sales.map((sale) => ({
    saleId: sale.sale_id,
    date: sale.date,
    productId: sale.product_id,
    quantity: sale.quantity,
  }));
  return { type: null, message: saleFormat };
};

const getById = async (id) => {
  const saleProduct = await salesModel.getById(id);
  const saleFormat = saleProduct.map((sale) => ({
    date: sale.date,
    productId: sale.product_id,
    quantity: sale.quantity,
  }));
  if (saleFormat.length === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  return { type: null, message: saleFormat };
};

module.exports = { getAll, getById };