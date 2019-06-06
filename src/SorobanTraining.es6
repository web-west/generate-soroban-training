import Combinatorics from 'js-combinatorics'
import Sugar from 'sugar'
import * as helper from './helpers';

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

        this.clearFirstMinusNumber();

        return this.generateActionNumbers;
    }

    clearFirstZeroNumber () {
        this.combinationAllowedNumbers = this.combinationAllowedNumbers.filter(item => item[0] !== 0);
    }

    clearFirstMinusNumber () {
        this.generateActionNumbers = this.generateActionNumbers.filter(item => item[0] > 0);
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
            let ex = item.example.map((num, index) => {
                return index === 0 || num < 0 ? num : `+${num}`
            })
            let sum = `=${item.sum}`
            return  ex.join('') + sum
        })
    }
};