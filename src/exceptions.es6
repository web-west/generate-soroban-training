import * as helper from './helpers';

export function FirstMinusNumber(array) {
    return array.filter(item => item[0] > 0);
}

export function SumLargeEqullyMaxAllowedNumber(array, max) {
    return array.filter((item) => {
        let sum = helper.ArrayNumbersSum(item);
        return sum <= max;
    });
}

export function SubSumLargeEqullyMaxAllowedNumber(array, max) {
    return array.filter((item) => {
        let filtered = true;
        let subSum = item[0];
        for (let key in item) {
            if (subSum > max) {
                filtered = false;
                break;
            }
            subSum += item[key];
        }
        return filtered
    });
}

export function SumNotZero(array) {
    return array.filter((item) => {
        let sum = helper.ArrayNumbersSum(item);
        return sum !== 0;
    });
}

export function Actions(array, params) {
    return array.filter((item) => {
        let str = helper.ArrayToNumberNormalize(item).join('');
        let filtered = true;
        for (let key in params) {
            if (str.indexOf(params[key])+1) {
                filtered = false;
                break;
            }
        }
        return filtered;
    });
}
