'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Random = Random;
exports.ArrayJoinToNumbersRundom = ArrayJoinToNumbersRundom;
exports.ArrayNumbersSum = ArrayNumbersSum;
exports.ArrayToNumberNormalize = ArrayToNumberNormalize;

var _sugar = require('sugar');

var _sugar2 = _interopRequireDefault(_sugar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Random(x) {
    return Math.floor(Math.random() * x);
}

function ArrayJoinToNumbersRundom(array, iteration) {
    var nums = [],
        arrLength = array.length,
        iter = arrLength < iteration ? arrLength : iteration;

    for (var i = 0; i < iter; i++) {
        var random = array[Random(arrLength - 1)].join('');
        nums = nums.concat([parseInt(random)]);
        nums = nums.concat([-parseInt(random)]);
    }
    return _sugar2.default.Array.unique(nums);
}

function ArrayNumbersSum(array) {
    return eval(array.join('+'));
}

function ArrayToNumberNormalize(array) {
    return array.map(function (num, index) {
        return index === 0 || num < 0 ? num : '+' + num;
    });
}