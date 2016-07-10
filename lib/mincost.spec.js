var mincost = require('./mincost');
var assert = require('chai').assert;

describe('mincost', function() {

  it('should return empty when the input is empty', function() {
    var shops = [], wishes = [];
    var actual = mincost(shops, wishes);
    assert.deepEqual(actual, {buys: [], cost: 0});
  });

  it('should return buys when the input is not empty but simple', function() {
    var shops = [['a'], ['b'], ['c']], wishes = ['a', 'b', 'c'];
    var actual = mincost(shops, wishes);
    assert.deepEqual(actual, {buys: [['a'], ['b'], ['c']], cost: 3});
  });

  it('should return buys when the input is not empty but complex', function() {
    var shops = [['a', 'b'], ['b', 'c'], ['c', 'd']], wishes = ['a', 'b', 'c', 'd'];
    var actual = mincost(shops, wishes);
    assert.deepEqual(actual, {buys: [['a', 'b'], [], ['c', 'd']], cost: 2});
  });

  it('should return buys when the input is not empty but complex and no buys plan qualified', function() {
    var shops = [['a', 'b'], ['b', 'c'], ['c', 'd']], wishes = ['a', 'b', 'c', 'd', 'e'];
    var actual = mincost(shops, wishes);
    assert.deepEqual(actual, {buys: [], cost: NaN});
  });

  it('should return buys when the input is not empty but complex and buys plan has bias on first shops', function() {
    var shops = [['a', 'b'], ['b', 'c'], ['c', 'd'], ['a', 'b', 'c']], wishes = ['a', 'b', 'c', 'd'];
    var actual = mincost(shops, wishes);
    assert.deepEqual(actual, {buys: [['a', 'b'], [], ['c','d'], []], cost: 2});
  });

  it('should return buys when the input is not empty but complex and buys last shop qualified', function() {
    var shops = [['a', 'b'], ['b', 'c'], ['c', 'd'], ['a', 'b', 'c', 'd']], wishes = ['a', 'b', 'c', 'd'];
    var actual = mincost(shops, wishes);
    assert.deepEqual(actual, {buys: [[], [], [], ['a', 'b', 'c', 'd']], cost: 1});
  });

  it('should return buys when the input is not empty but complex and buys last 2 shops qualified', function() {
    var shops = [['a', 'b'], ['b', 'c'], ['d'], ['a', 'b', 'c']], wishes = ['a', 'b', 'c', 'd'];
    var actual = mincost(shops, wishes);
    assert.deepEqual(actual, {buys: [[], [], ['d'], ['a', 'b', 'c']], cost: 2});
  });

});