import * as helper from './helpers';

export function FirstMinusNumber(array) {
    return array.filter(item => item[0] > 0);
}

export function SumLessEqullyMaxAllowedNumber(array, max) {
    return array.filter((item) => {
        let sum = helper.ArrayNumbersSum(item);
        return sum <= max;
    });
}

export function SumLargeEqullyMinAllowedNumber (array, min) {
    return array.filter((item) => {
        let sum = helper.ArrayNumbersSum(item);
        return sum >= min;
    });
}

export function SubSumLessEqullyMaxAllowedNumber(array, max) {
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

export function SubSumLargeEqullyMinAllowedNumber(array, min) {
    return array.filter((item) => {
        let filtered = true;
        let subSum = item[0];
        for (let key in item) {
            if (subSum < min) {
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

export function SumContainedNumbers (array, numbers) {
    let filtered = true
    return array.filter((item) => {
        let str = (''+helper.ArrayNumbersSum(item)).replace(/\D+/g,"");
        for (let i = 0; i < str.length; i++) {
            let num = parseInt(str.charAt(i))
            if (numbers.indexOf(num) === -1) {
                filtered = false;
                break;
            }
        }
        return filtered;
    });
}
