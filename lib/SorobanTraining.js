'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsCombinatorics = require('js-combinatorics');

var _jsCombinatorics2 = _interopRequireDefault(_jsCombinatorics);

var _sugar = require('sugar');

var _sugar2 = _interopRequireDefault(_sugar);

var _helpers = require('./helpers');

var helper = _interopRequireWildcard(_helpers);

var _exceptions = require('./exceptions');

var ex = _interopRequireWildcard(_exceptions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class(config) {
        _classCallCheck(this, _class);

        this.numbersArray = [];
        this.digit = config.digit || 1;
        this.debug = config.debug || false;
        this.actions = config.actions || 2;
        this.exampleslength = config.exampleslength || 1;
        this.allowedNumbers = config.allowedNumbers || [];
        this.combinationAllowedNumbers = [];
        this.generateActionNumbers = [];
        this.limit = config.limit || 50000;
        this.exceptions = config.exceptions || null;
        this.maxAllowedNumber = Math.max.apply(Math, _toConsumableArray(config.allowedNumbers)) || null;
        this.minAllowedNumber = Math.min.apply(Math, _toConsumableArray(config.allowedNumbers)) || null;
        this.containedNumbers = config.allowedNumbers || null;
    }

    _createClass(_class, [{
        key: 'log',
        value: function log(data) {
            if (this.debug) {
                console.log(data);
            }
        }
    }, {
        key: 'getCombinationAllowedNumbers',
        value: function getCombinationAllowedNumbers() {
            this.combinationAllowedNumbers = _jsCombinatorics2.default.baseN(this.allowedNumbers, this.digit);
            this.clearFirstZeroNumber();

            return this.combinationAllowedNumbers;
        }
    }, {
        key: 'getRundomCombinationNumbersJoined',
        value: function getRundomCombinationNumbersJoined() {
            var array = this.getCombinationAllowedNumbers();
            return helper.ArrayJoinToNumbers(array, array.length);
        }
    }, {
        key: 'getCombinationJoinedNumbersActions',
        value: function getCombinationJoinedNumbersActions() {
            var start = new Date().getTime();
            var array = this.getRundomCombinationNumbersJoined();
            var result = [];

            this.generateActionNumbers = _jsCombinatorics2.default.baseN(array, this.actions);
            var len = this.generateActionNumbers.length;
            var i = 0;

            if (this.exceptions) {
                do {
                    var r = helper.Random(len - 1);
                    var item = this.clearExceptions([this.generateActionNumbers.nth(r)]);
                    if (item.length) {
                        result.push(item[0]);
                    }
                    i++;
                } while (result.length < this.exampleslength && i < this.limit);
            }
            var end = new Date().getTime();
            this.log('Combination: ' + len + ', Time complile: ' + (end - start) / 1000 + 's, iteration: ' + i + ', examples: ' + result.length);

            return this.generateActionNumbers = result;
        }
    }, {
        key: 'clearFirstZeroNumber',
        value: function clearFirstZeroNumber() {
            this.combinationAllowedNumbers = this.combinationAllowedNumbers.filter(function (item) {
                return item[0] !== 0;
            });
        }
    }, {
        key: 'clearExceptions',
        value: function clearExceptions(array) {
            var result = array;
            for (var key in this.exceptions) {
                if (result.length) {
                    switch (key) {
                        case 'first mines number':
                            result = ex.FirstMinusNumber(result);
                            break;
                        case 'sum <= max allowed number':
                            result = ex.SumLessEqullyMaxAllowedNumber(result, this.exceptions[key] || this.maxAllowedNumber);
                            break;
                        case 'sum >= min allowed number':
                            result = ex.SumLargeEqullyMinAllowedNumber(result, this.exceptions[key] || this.minAllowedNumber);
                            break;
                        case 'sub sum <= max allowed number':
                            result = ex.SubSumLessEqullyMaxAllowedNumber(result, this.exceptions[key] || this.maxAllowedNumber);
                            break;
                        case 'sub sum >= min allowed number':
                            result = ex.SubSumLargeEqullyMinAllowedNumber(result, this.exceptions[key] || this.minAllowedNumber);
                            break;
                        case 'sum != zero':
                            result = ex.SumNotZero(result);
                            break;
                        case 'sum contained numbers':
                            result = ex.SumContainedNumbers(result, this.exceptions[key] || this.containedNumbers);
                            break;
                        case 'actions':
                            result = ex.Actions(result, this.exceptions[key]);
                            break;
                    }
                }
            }

            return result;
        }
    }, {
        key: 'getExamplesArray',
        value: function getExamplesArray() {
            var _this = this;

            this.getCombinationJoinedNumbersActions();
            return this.generateActionNumbers.filter(function (i, index) {
                return index < _this.exampleslength;
            }).map(function (item) {
                return {
                    example: item,
                    sum: helper.ArrayNumbersSum(item)
                };
            });
        }
    }, {
        key: 'getExamplesString',
        value: function getExamplesString() {
            var array = this.getExamplesArray();
            return array.map(function (item) {
                var ex = helper.ArrayToNumberNormalize(item.example);
                var sum = '=' + item.sum;
                return ex.join('') + sum;
            });
            return;
        }
    }]);

    return _class;
}();

exports.default = _class;
;