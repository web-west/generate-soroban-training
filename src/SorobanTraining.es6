import Combinatorics from 'js-combinatorics'
import Sugar from 'sugar'
import * as helper from './helpers';
import * as ex from './exceptions';

export default class {
    
    constructor (config) {
        this.numbersArray = [];
        this.digit = config.digit || 1;
        this.debug = config.debug || false;
        this.actions = config.actions || 2;
        this.exampleslength = config.exampleslength || 1;
        this.allowedNumbers = config.allowedNumbers || [];
        this.combinationAllowedNumbers = [];
        this.generateActionNumbers = [];
        this.limit = config.limit || 50000;
        this.exceptions = config.exceptions || null
        this.maxAllowedNumber = Math.max(...config.allowedNumbers) || null
        this.minAllowedNumber = Math.min(...config.allowedNumbers) || null
        this.containedNumbers = config.allowedNumbers || null
    }

    log (data) {
        if (this.debug) {
            console.log(data)
        }
    }

    getCombinationAllowedNumbers () {
        this.combinationAllowedNumbers = Combinatorics.baseN(this.allowedNumbers, this.digit);
        this.clearFirstZeroNumber();

        return this.combinationAllowedNumbers;
    }

    getRundomCombinationNumbersJoined () {
        let array = this.getCombinationAllowedNumbers();
        return helper.ArrayJoinToNumbers(array, array.length);
    }

    getCombinationJoinedNumbersActions () {
        const start = new Date().getTime();
        let array = this.getRundomCombinationNumbersJoined();
        let result = [];

        this.generateActionNumbers = Combinatorics.baseN(array, this.actions);
        let len = this.generateActionNumbers.length
        let i = 0

        if (this.exceptions) {
            do {
                let r = helper.Random(len - 1);
                let item = this.clearExceptions([this.generateActionNumbers.nth(r)])            
                if (item.length) {
                    result.push(item[0])
                }
                i++;
            } while (result.length < this.exampleslength && i < this.limit)
        }
        const end = new Date().getTime();
        this.log(`Combination: ${len}, Time complile: ${(end - start)/1000}s, iteration: ${i}, examples: ${result.length}`)

        return this.generateActionNumbers = result;
    }

    clearFirstZeroNumber () {
        this.combinationAllowedNumbers = this.combinationAllowedNumbers.filter(item => item[0] !== 0);
    }

    clearExceptions (array) {
        let result = array
        for (let key in this.exceptions) {
            if (result.length) {
                switch (key) {
                    case 'first mines number':
                        result = ex.FirstMinusNumber(result)
                        break;
                    case 'sum <= max allowed number':
                        result = ex.SumLessEqullyMaxAllowedNumber(result, this.exceptions[key] || this.maxAllowedNumber)
                        break;
                    case 'sum >= min allowed number':
                        result = ex.SumLargeEqullyMinAllowedNumber(result, this.exceptions[key] || this.minAllowedNumber)
                        break;
                    case 'sub sum <= max allowed number':
                        result = ex.SubSumLessEqullyMaxAllowedNumber(result, this.exceptions[key] || this.maxAllowedNumber)
                        break;
                    case 'sub sum >= min allowed number':
                        result = ex.SubSumLargeEqullyMinAllowedNumber(result, this.exceptions[key] || this.minAllowedNumber)
                        break;
                    case 'sum != zero':
                        result = ex.SumNotZero(result)
                        break;
                    case 'sum contained numbers':
                        result = ex.SumContainedNumbers(result, this.exceptions[key] || this.containedNumbers)
                        break;
                    case 'actions':
                        result = ex.Actions(result, this.exceptions[key])
                        break;
                }
            }
        }

        return result
    }

    getExamplesArray () {
        this.getCombinationJoinedNumbersActions()
        return this.generateActionNumbers.filter((i, index) => (index < this.exampleslength)).map((item) => {
            return {
                example: item,
                sum: helper.ArrayNumbersSum(item)
            }
        })
    }

    getExamplesString () {
        let array = this.getExamplesArray()
        return array.map((item) => {
            let ex = helper.ArrayToNumberNormalize(item.example);
            let sum = `=${item.sum}`
            return  ex.join('') + sum
        })
        return 
    }
};