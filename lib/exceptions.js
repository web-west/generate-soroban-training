'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FirstMinusNumber = FirstMinusNumber;
exports.SumLessEqullyMaxAllowedNumber = SumLessEqullyMaxAllowedNumber;
exports.SumLargeEqullyMinAllowedNumber = SumLargeEqullyMinAllowedNumber;
exports.SubSumLessEqullyMaxAllowedNumber = SubSumLessEqullyMaxAllowedNumber;
exports.SubSumLargeEqullyMinAllowedNumber = SubSumLargeEqullyMinAllowedNumber;
exports.SumNotZero = SumNotZero;
exports.Actions = Actions;
exports.SumContainedNumbers = SumContainedNumbers;

var _helpers = require('./helpers');

var helper = _interopRequireWildcard(_helpers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function FirstMinusNumber(array) {
    return array.filter(function (item) {
        return item[0] > 0;
    });
}

function SumLessEqullyMaxAllowedNumber(array, max) {
    return array.filter(function (item) {
        var sum = helper.ArrayNumbersSum(item);
        return sum <= max;
    });
}

function SumLargeEqullyMinAllowedNumber(array, min) {
    return array.filter(function (item) {
        var sum = helper.ArrayNumbersSum(item);
        return sum >= min;
    });
}

function SubSumLessEqullyMaxAllowedNumber(array, max) {
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

function SubSumLargeEqullyMinAllowedNumber(array, min) {
    return array.filter(function (item) {
        var filtered = true;
        var subSum = item[0];
        for (var key in item) {
            if (subSum < min) {
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

function SumContainedNumbers(array, numbers) {
    var filtered = true;
    return array.filter(function (item) {
        var str = ('' + helper.ArrayNumbersSum(item)).replace(/\D+/g, "");
        for (var i = 0; i < str.length; i++) {
            var num = parseInt(str.charAt(i));
            if (numbers.indexOf(num) === -1) {
                filtered = false;
                break;
            }
        }
        return filtered;
    });
}