'use strict';

var _SorobanTraining = require('./SorobanTraining');

var _SorobanTraining2 = _interopRequireDefault(_SorobanTraining);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
    digit: 1,
    allowedNumbers: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    actions: 5,
    exampleslength: 15,
    exceptions: {
        'first mines number': null,
        'sum <= max allowed number': null,
        'sub sum <= max allowed number': null,
        'sub sum != zero': null,
        'actions': ['8-4', '7-4', '6-4', '5-4', '1+4', '2+4', '3+4', '4+4']
    }
};

var soromban = new _SorobanTraining2.default(config);

// console.dir(soromban.getRundomCombinationNumbersJoined());
// console.dir(soromban.getExamplesArray());
console.dir(soromban.getExamplesString());

module.exports = _SorobanTraining2.default;