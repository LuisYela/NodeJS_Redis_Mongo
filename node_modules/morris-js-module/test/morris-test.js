const chai = require('chai');
const jquery = require('jquery');
const morris = require('../morris')(jquery);

const should = chai.should();

const propertiesRequired = [
  'EventEmitter',
  'commas',
  'pad2',
  'Grid',
  'parseDate',
  'Hover',
  'Line',
  'labelSeries',
  'LABEL_SPECS',
  'AUTO_LABEL_ORDER',
  'Area',
  'Bar',
  'Donut',
  'DonutSegment',

];
describe('Export test', () => {
  it('should have all plugin properties', () => {
    propertiesRequired.forEach((name) => {
      console.log(name);
      (morris).should.have.property(name);
    });
  })
});