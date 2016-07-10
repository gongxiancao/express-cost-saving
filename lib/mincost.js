'use strict';


/*
  f(shops, items) = min(f(shops - shops[shops.length - 1], items - shopItems[shops.length - 1]) + 1, f(shops - shops[shops.length - 1], items))
*/

function buy(left, right) {
  var difference = [];
  var common = [];

  for(var i = 0, ilen = left.length, j = 0, jlen = right.length; i < ilen; ) {
    var ileft = left[i], jright = right[j];
    if(j >= jlen || ileft < jright ) {
      difference.push(ileft);
      ++i;
    } else if(ileft > jright) {
      ++j;
    } else if(ileft === jright) {
      common.push(jright);
      ++i;
      ++j;
    }
  }
  return {
    remain: difference,
    buy: common
  };
}

function minimumCostRecurse(shops, items, cache) {
  if(items.length === 0) {
    return {
      buys: shops.map(function () {return [];}),
      cost: 0
    };
  }
  if(shops.length === 0) {
    return {
      buys: [],
      cost: NaN
    };
  }

  var key = ['[' + shops.length + '],[' + items.join(',') + ']'];
  var result = cache[key];
  if(result) {
    return minimumCostRecurse;
  }

  var nextShops = shops.slice(0, -1);
  var buyResult = buy(items, shops[shops.length - 1]);

  var buyCost = minimumCostRecurse(nextShops, buyResult.remain, cache);
  var notBuyCost = minimumCostRecurse(nextShops, items, cache);

  if(Number.isFinite(buyCost.cost) &&
    (!Number.isFinite(notBuyCost.cost) ||
    (Number.isFinite(notBuyCost.cost) && buyCost.cost + 1 < notBuyCost.cost))) {
    return {
      buys: buyCost.buys.concat([buyResult.buy]),
      cost: buyCost.cost + 1
    };
  }
  if(Number.isFinite(notBuyCost.cost) && 
    (!Number.isFinite(buyCost.cost) ||
    (Number.isFinite(buyCost.cost) && notBuyCost.cost <= buyCost.cost + 1))) {
    return {
      buys: notBuyCost.buys.concat([[]]),
      cost: notBuyCost.cost
    };
  }
  return {
    buys: [],
    cost: NaN
  };
}

/*
shops: [
  ['a', 'b', 'c']
  ['b', 'c', 'd']
]

wishes: [
  'a',
  'b',
  'd'
]
*/

function minimumCost(shops, wishes) {
  var cache = {};
  shops = shops.map(function (shop) {
    return shop.slice(0).sort();
  });
  wishes = wishes.slice(0).sort();
  var minCost = minimumCostRecurse(shops, wishes, cache);
  return minCost;
}


module.exports = minimumCost;

