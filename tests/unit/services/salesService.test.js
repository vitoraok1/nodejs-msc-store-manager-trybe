const chai = require('chai')
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;

chai.use(sinonChai);

const salesModel = require('../../../src/models/salesModel');
const salesService = require('../../../src/services/salesService');
const { getAllMockWithData, getByIdMockWithData } = require('../mock/sales.mock');

describe('Sales Service tests', () => {
  afterEach(() => sinon.restore());
  describe('Success case', () => {
    it('getAll with data', async () => {
      sinon.stub(salesModel, 'getAll').resolves(getAllMockWithData);

      const result = await salesService.getAll();

      expect(result.type).to.be.equal(null);
      expect(result.message).to.have.length(3);
    });

    it('getById with data', async () => {
      sinon.stub(salesModel, 'getById').resolves(getByIdMockWithData);

      const result = await salesService.getById(1);

      expect(result.type).to.be.equal(null);
      expect(result.message).to.have.length(2);
    });
  });

  describe('Fails case', () => {
    it('getById with a non existent id', async () => {
      sinon.stub(salesModel, 'getById').resolves([]);

      const result = await salesService.getById(55);

      expect(result.type).to.be.equal('SALE_NOT_FOUND');
      expect(result.message).to.be.equal('Sale not found');
    });
  });
});