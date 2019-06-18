import SorobanTraining from './SorobanTraining';

/* const config = {
    debug: true,
    digit: 1,
    allowedNumbers: [0, 1, 2, 4, 5, 6, 7, 8, 9],
    actions: 10,
    exampleslength: 20,
    limit: 1000000,
    exceptions: {
        'first mines number': null,
        'sum <= max allowed number': null,
        'sum >= min allowed number': null,
        'sub sum <= max allowed number': null,
        // 'sub sum >= min allowed number': 0,
        'sum != zero': null,
        'actions': ['1+1'],
        'sum contained numbers': null
    }
}

let soromban = new SorobanTraining(config);

console.dir(soromban.getExamplesString()); */

// console.dir(soromban.getExamplesArray().length);

module.exports = SorobanTraining
