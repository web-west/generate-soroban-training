## Генератор примеров по методологии "соробан"

![](https://travis-ci.org/web-west/generate-soroban-training.svg?branch=master) ![](https://img.shields.io/github/stars/web-west/generate-soroban-training.svg) ![](https://img.shields.io/github/forks/web-west/generate-soroban-training.svg) ![](https://img.shields.io/github/tag/web-west/generate-soroban-training.svg) ![](https://img.shields.io/github/issues/web-west/generate-soroban-training.svg)

### Установка

`npm i -S generate-soroban-training`

### Возможности

- оперделение массива используемых чисел
- определение числового разряда
- уникальность за счет алгоритма отбора и фильтрации
- исключение ноля в начале формирования числа
- подсчет суммы
- вывод в виде строки
- лимитирование по количеству рандомных операций
- лимитирование по количеству примеров
- лимитирование по количетству операций сложения вычитания

### Методы исключений

- первый ноль в числе
- первое отрицательное число
- примеры с суммой больше равно максимального чиста
- примеры с суммой меньше равно минимального чиста
- исключает примеры с промежуточной суммой больше равно максимального чиста
- исключает примеры с промежуточной суммой меньше равно минимального чиста
- исключает сумму равную нулю
- исключает вхождение определенных операций
- исключает примеры в суммах которых присутствуют только разрешенные числа

### API
#### Methods

##### Получение массива примеров
```javascript
let examples = SorobanTraining.getExamplesArray();
console.log(examples);
/*
[
	{ example: [ 422, 201 ], sum: 623 },
	{ example: [ 135, -201 ], sum: -66 },
 ]
*/
```

##### Получение строк примеров
```javascript
let examples = SorobanTraining.getExamplesString();
console.log(examples);
/*
[ 
	'332-430+214-204=-88',
	'111-532+111+540=230',
]
*/
```

#### Настройки

```javascript
const config = {
    debug: 1, // дебагинг
	digit: 1, // разрядность числа
    allowedNumbers: [0, 1, 2, 3, 4, 5], // разрешенные цифры
    actions: 2, // количество математических операций
    exampleslength: 2, // количество генерируемых примеров
	limit: 1000000, // количество случайных наборов потенциальных примеров
	exceptions: {
        'first mines number': null, // исключает первое отрицательное число
        'sum <= max allowed number': null, // исключает примеры с суммой больше равно максимального чиста, если `null` то максимальное число массива `allowedNumbers`
        'sum >= min allowed number': null, // исключает примеры с суммой меньше равно минимального чиста, если `null` то минимальное число массива `allowedNumbers`
        'sub sum <= max allowed number': null, // исключает примеры с промежуточной суммой больше равно максимального чиста, если `null` то максимальное число массива `allowedNumbers`
        'sub sum >= min allowed number': null, // исключает примеры с промежуточной суммой меньше равно минимального чиста, если `null` то минимальное число массива `allowedNumbers`
        'sub sum != zero': null, // исключает сумму равную нулю
        'actions': ['8-4', '7-4', '6-4', '5-4', '1+4', '2+4', '3+4', '4+4'], // исключает вхождение определенных операций
        'sum contained numbers': null // исключает примеры в суммах которых присутствуют только разрешенные числа, если `null` то разрешенными будут `allowedNumbers`
    },
    
}

new SorobanTraining(config);
```
