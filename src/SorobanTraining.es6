import Combinatorics from 'js-combinatorics'
import Sugar from 'sugar'
import * as helper from './helpers';
import * as ex from './exceptions';

export default class {
    
    constructor (config) {
        this.numbersArray = [];
        this.digit = config.digit || 1;
        this.actions = config.actions || 2;
        this.exampleslength = config.exampleslength || 1;
        this.allowedNumbers = config.allowedNumbers || [];
        this.combinationAllowedNumbers = [];
        this.rundomIteration = config.rundomIteration || 10;
        this.generateActionNumbers = [];
        this.limit = config.limit || 5000;
        this.exceptions = config.exceptions || null
        this.maxAllowedNumber = Math.max(...config.allowedNumbers) || null
        this.minAllowedNumber = Math.min(...config.allowedNumbers) || null
        this.containedNumbers = config.allowedNumbers || null
    }

    getCombinationAllowedNumbers () {
        this.combinationAllowedNumbers = Combinatorics.baseN(this.allowedNumbers, this.digit);
        this.clearFirstZeroNumber();

        return this.combinationAllowedNumbers;
    }

    getRundomCombinationNumbersJoined () {
        let array = this.getCombinationAllowedNumbers();
        return helper.ArrayJoinToNumbersRundom(array, this.rundomIteration);
    }

    getCombinationJoinedNumbersActions () {
        let array = this.getRundomCombinationNumbersJoined(),
            result = [];

        this.generateActionNumbers = Combinatorics.baseN(array, this.actions);

        let length = this.generateActionNumbers.length

        for(let i = 0; i < this.limit; i++) {
            let index = helper.Random(length);
            result.push(this.generateActionNumbers.nth(index));
        }

        this.generateActionNumbers = Sugar.Array.unique(result);

        if (this.exceptions) {
            this.clearExceptions()
        }

        return this.generateActionNumbers;
    }

    clearFirstZeroNumber () {
        this.combinationAllowedNumbers = this.combinationAllowedNumbers.filter(item => item[0] !== 0);
    }

    clearExceptions () {
        for (let key in this.exceptions) {
            switch (key) {
                case 'first mines number':
                    this.generateActionNumbers = ex.FirstMinusNumber(this.generateActionNumbers)
                    break;
                case 'sum <= max allowed number':
                    this.generateActionNumbers = ex.SumLessEqullyMaxAllowedNumber(this.generateActionNumbers, this.exceptions[key] || this.maxAllowedNumber)
                    break;
                case 'sum >= min allowed number':
                    this.generateActionNumbers = ex.SumLargeEqullyMaxAllowedNumber(this.generateActionNumbers, this.exceptions[key] || this.minAllowedNumber)
                    break;
                case 'sub sum <= max allowed number':
                    this.generateActionNumbers = ex.SubSumLessEqullyMaxAllowedNumber(this.generateActionNumbers, this.exceptions[key] || this.maxAllowedNumber)
                    break;
                case 'sub sum >= min allowed number':
                    this.generateActionNumbers = ex.SubSumLargeEqullyMaxAllowedNumber(this.generateActionNumbers, this.exceptions[key] || this.maxAllowedNumber)
                    break;
                case 'sum != zero':
                    this.generateActionNumbers = ex.SumNotZero(this.generateActionNumbers)
                    break;
                case 'sum contained numbers':
                    this.generateActionNumbers = ex.SumContainedNumbers(this.generateActionNumbers, this.exceptions[key] || this.containedNumbers)
                    break;
                case 'actions':
                    this.generateActionNumbers = ex.Actions(this.generateActionNumbers, this.exceptions[key])
                    break;
            }
        }
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