var chai = chai || require('chai');
var should = chai.should();
var assert = chai.assert;
var BN = require('../lib/bn');

describe('BN', function() {
  it('should create a bn', function() {
    var bn = new BN(50);
    should.exist(bn);
    bn.toString().should.equal('50');
    bn = BN(50);
    bn.toString().should.equal('50');
    (bn instanceof BN).should.equal(true);
    bn = BN('ff00', 16);
    bn.toString(16).should.equal('ff00');
    bn = new BN('ff00', 16);
    bn.toString(16).should.equal('ff00');
  });

  it('should parse this number', function() {
    var bn = BN(999970000);
    bn.toString().should.equal('999970000');
  });

  it('should parse numbers below and at bn.js internal word size', function() {
    var bn = BN(Math.pow(2, 26) - 1);
    bn.toString().should.equal((Math.pow(2, 26) - 1).toString());
    var bn = BN(Math.pow(2, 26));
    bn.toString().should.equal((Math.pow(2, 26)).toString());
  });

  describe('#copy', function() {
    
    it('should copy 5', function() {
      var bn = BN('5');
      var bn2;
      (function() {
        bn.copy(bn2);
      }).should.throw(); //bn2 is not a BN yet
      bn2 = BN();
      bn.copy(bn2);
      bn2.toString().should.equal('5');
    });

  });
  
  describe('#add', function() {

    it('should add two small numbers together', function() {
      var bn1 = BN(50);
      var bn2 = BN(75);
      var bn3 = bn1.add(bn2);
      bn3.toString().should.equal('125');
    });

  });

  describe('#sub', function() {

    it('should subtract a small number', function() {
      var bn1 = BN(50);
      var bn2 = BN(25);
      var bn3 = bn1.sub(bn2);
      bn3.toString().should.equal('25');
    });

  });

  describe('#gt', function() {

    it('should say 1 is greater than 0', function() {
      var bn1 = BN(1);
      var bn0 = BN(0);
      bn1.gt(bn0).should.equal(true);
    });

    it('should say a big number is greater than a small big number', function() {
      var bn1 = BN('24023452345398529485723980457');
      var bn0 = BN('34098234283412341234049357');
      bn1.gt(bn0).should.equal(true);
    });

    it('should say a big number is great than a standard number', function() {
      var bn1 = BN('24023452345398529485723980457');
      var bn0 = BN(5);
      bn1.gt(bn0).should.equal(true);
    });

  });

  describe('#fromJSON', function() {
    
    it('should make BN from a string', function() {
      BN().fromJSON('5').toString().should.equal('5');
    });

  });

  describe('#toJSON', function() {
    
    it('should make string from a BN', function() {
      BN(5).toJSON().should.equal('5');
      BN().fromJSON('5').toJSON().should.equal('5');
    });

  });

  describe('#fromString', function() {
    
    it('should make BN from a string', function() {
      BN().fromString('5').toString().should.equal('5');
    });

  });

  describe('#toString', function() {
    
    it('should make a string', function() {
      BN(5).toString().should.equal('5');
    });

  });

  describe('@fromBuffer', function() {
    
    it('should work with big endian', function() {
      var bn = BN.fromBuffer(new Buffer('0001', 'hex'), {endian: 'big'});
      bn.toString().should.equal('1');
    });

    it('should work with big endian 256', function() {
      var bn = BN.fromBuffer(new Buffer('0100', 'hex'), {endian: 'big'});
      bn.toString().should.equal('256');
    });

    it('should work with little endian if we specify the size', function() {
      var bn = BN.fromBuffer(new Buffer('0100', 'hex'), {size: 2, endian: 'little'});
      bn.toString().should.equal('1');
    });

  });

  describe('#fromBuffer', function() {

    it('should work as a prototype method', function() {
      var bn = BN().fromBuffer(new Buffer('0100', 'hex'), {size: 2, endian: 'little'});
      bn.toString().should.equal('1');
    });
  
  });

  describe('#toBuffer', function() {
    
    it('should create a 4 byte buffer', function() {
      var bn = BN(1);
      bn.toBuffer({size: 4}).toString('hex').should.equal('00000001');
    });

    it('should create a 4 byte buffer in little endian', function() {
      var bn = BN(1);
      bn.toBuffer({size: 4, endian: 'little'}).toString('hex').should.equal('01000000');
    });

    it('should create a 2 byte buffer even if you ask for a 1 byte', function() {
      var bn = BN('ff00', 16);
      bn.toBuffer({size: 1}).toString('hex').should.equal('ff00');
    });

    it('should create a 4 byte buffer even if you ask for a 1 byte', function() {
      var bn = BN('ffffff00', 16);
      bn.toBuffer({size: 4}).toString('hex').should.equal('ffffff00');
    });

  });

  describe('#fromNumber', function() {

    it('should convert from a number', function() {
      BN().fromNumber(5).toNumber().should.equal(5);
    });

  });

  describe('#toNumber', function() {

    it('it should convert to a number', function() {
      BN(5).toNumber().should.equal(5);
    });

  });

});