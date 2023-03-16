//1 задача потраченное времени 1 мин
const concatCities = (cities) => cities.join(", ") + "."

console.log("1. " + concatCities(["Москва", "Санкт-Петербург", "Воронеж"]));
console.log("-----------------");




//2 задача потраченное времени 3 мин
const roundingToFive = (number) => {
  const fiveCount = Math.round(number / 5)
  return fiveCount * 5
}

console.log("2. " + roundingToFive(27));
console.log("-----------------");




//3 задача потраченное времени 6 мин
const cases = (n) => {
  const lastNum = n % 10;
  if (lastNum == 1) return `${lastNum} компьютер`;
  if (lastNum > 1 && lastNum < 5) return `${lastNum} компьютера`;
  return `${n} компьютеров`;
};

console.log("3. " + cases(10));
console.log("-----------------");




//4 задача потраченное времени 10 мин
const isSimple = (n) => {
  if (n == 1) return false
  if (n == 2) return true
  for (let i = 2; i < n; i++) {
    if (n % i == 0) {
      return false
    }
  }
  return true
}

console.log("4. " + isSimple(11));
console.log("-----------------");





//5 задача потраченное времени 40 мин

//метод для нахождения пар в одном массиве
const findPairsInArray = (arr) => {
  let pairs = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        if (!pairs.includes(arr[i])) pairs.push(arr[i]);
      }
    }
  }
  return pairs;
};

//метод для сравнения двух массивов
const findPairsInArrays = (arr1, arr2) => {
  const firstArrayPairs = findPairsInArray(arr1);
  const secondArrayPairs = findPairsInArray(arr2);
  const concattedArrays = firstArrayPairs.concat(secondArrayPairs);
  return findPairsInArray(concattedArrays);
};

console.log("5. " + findPairsInArrays([7, 17, 1, 9, 1, 17, 56, 56, 23], [56, 17, 17, 1, 23, 34, 23, 1, 8, 1]));
console.log("-----------------");




//6 задача потраченное времени 2 часа
//метод для создания таблицы(матрицы)
const createMultiplicationTable = (n) => {
  const columns = [];
  const firstRow = [];
  for (let i = 1; i <= n; i++) firstRow.push(i)
  columns.push(firstRow)
  for (let i = 1; i <= n; i++) {
    const newColumn = [i];
    for (let j = 1; j <= n; j++) {
      newColumn.push(i * j);
    }
    columns.push(newColumn);
  }
  return columns;
};

//метод проверки длинны числа
const getNumLength = (num) => num.toString().length;

//метод отрисовки таблицы
const showMultiplicationTable = (table) => {
  for (let i = 0; i < table.length; i++) {
    let row = "";
    if (i === 0) {
        row += "   "
    }
    for (let j = 0; j < table[i].length; j++) {
      if (getNumLength(table[i][j]) > 1) {
        row += " " + table[i][j];
      } else {
        row += "  " + table[i][j];
      }
    }
    console.log(row);
  }
};

console.log("6.");
showMultiplicationTable(createMultiplicationTable(5));
