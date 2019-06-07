'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FirstMinusNumber = FirstMinusNumber;
exports.SumLargeEqullyMaxAllowedNumber = SumLargeEqullyMaxAllowedNumber;
exports.SubSumLargeEqullyMaxAllowedNumber = SubSumLargeEqullyMaxAllowedNumber;
exports.SumNotZero = SumNotZero;
exports.Actions = Actions;

var _helpers = require('./helpers');

var helper = _interopRequireWildcard(_helpers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function FirstMinusNumber(array) {
    return array.filter(function (item) {
        return item[0] > 0;
    });
}

function SumLargeEqullyMaxAllowedNumber(array, max) {
    return array.filter(function (item) {
        var sum = helper.ArrayNumbersSum(item);
        return sum <= max;
    });
}

function SubSumLargeEqullyMaxAllowedNumber(array, max) {
    return array.filter(function (item) {
        var filtered = true;
        var subSum = item[0];
        for (var key in item) {
            if (subSum > max) {
                filtered = false;
                break;
            }
            subSum += item[key];
        }
        return filtered;
    });
}

function SumNotZero(array) {
    return array.filter(function (item) {
        var sum = helper.ArrayNumbersSum(item);
        return sum !== 0;
    });
}

function Actions(array, params) {
    return array.filter(function (item) {
        var str = helper.ArrayToNumberNormalize(item).join('');
        var filtered = true;
        for (var key in params) {
            if (str.indexOf(params[key]) + 1) {
                filtered = false;
                break;
            }
        }
        return filtered;
    });
}