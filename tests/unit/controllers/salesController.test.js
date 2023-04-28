const chai = require('chai')
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;

chai.use(sinonChai);

const salesController = require('../../../src/controllers/salesController');
const salesService = require('../../../src/services/salesService');
const { getAllMockWithData, getByIdMockWithData } = require('../mock/products.mock');

describe('Products Controller tests', () => {
  afterEach(() => sinon.restore());
  describe('Success case', () => {
    it('getAll with data', async () => {
      sinon.stub(salesService, 'getAll').resolves({
        type: null,
        message: getAllMockWithData,
      });

      const req = {};
      const res = {};

      res.json = sinon.stub().returns();
      res.status = sinon.stub().returns(res);

      await salesController.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
    });

    it('getById with data', async () => {
      sinon.stub(salesService, 'getById').resolves({
        type: null,
        message: getByIdMockWithData,
      });

      const req = {
        params: { id: 1 },
      };
      const res = {};

      res.json = sinon.stub().returns();
      res.status = sinon.stub().returns(res);

      await salesController.getById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(getByIdMockWithData);
    });
  });

  describe('Fails case', () => {
    it('getById with a non existent id', async () => {
      sinon.stub(salesService, 'getById').resolves({
        type: 'SALE_NOT_FOUND',
        message: 'Sale not found',
      });

      const req = {
        params: { id: 55 },
      };
      const res = {};

      res.json = sinon.stub().returns();
      res.status = sinon.stub().returns(res);

      await salesController.getById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  });
});