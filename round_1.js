//Question 1: map vs forEach

const arr = [2, 5, 3, 4, 7];

const mapResult = arr.map((ar) => {
  return ar + 2;
});
//map is not going to modify the original array

const forEachResult = arr.forEach((ar) => {
  return ar + 2; //this doesn't return anything just like map does
});

console.log(mapResult, forEachResult); //forEachResult will return undefined

const forEachResult = arr.forEach((ar, i) => {
  arr[i] = ar + 2;
}); //this way will modify the original array

console.log(arr); //cause we are modifing the original array

const mapResult = arr
  .map((ar) => {
    return ar + 2;
  })
  .filter(); //we can do filter with map but not forEach

//Question 2: null vs undefined
//null is actual value
//undefined means that the variable is declared but is not initialized yet

console.log(typeof null); //object
console.log(typeof undefined); //undefined

let a;
console.log(a); //undefined

console.log(null == undefined); //true, double = means comapres both entities wo matching their types
console.log(null === undefined); //false, strict = compares the types of these entities

//Question 3: Explain Event Delegation
//scenario: a e commerce site has lots of products. We are not assign event on each product. It will take lots of memories
document.querySelector("#products").addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    window.location.href += "#" + event.target.id;
  }
});

//Question 4: Flatten the Array

let arr = [
  [1, 2],
  [3, 4],
  [5, 6, [7, 8], 9],
  [10, 11, 12],
];

let flattened = [].concat(...arr); //spread the array one level

console.log(flattened); //[1, 2, 3, 4, 5, 6, [7, 8], 9, 10, 11, 12]

//concat example
// const array1 = ['a', 'b', 'c'];
// const array2 = ['d', 'e', 'f'];
// const array3 = array1.concat(array2);

// console.log(array3);
// expected output: Array ["a", "b", "c", "d", "e", "f"]

//since only one level, we write our custom flat function
function customFlat(arr, depth = 1) {
  let result = [];
  arr.forEach((ar) => {
    if (Array.isArray(ar) && depth > 0) {
      result.push(...customFlat(ar, depth - 1));
    } else result.push(ar);
  });

  return result;
}
//explanation is at 13:00

console.log(customFlat(arr, 2)); //[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

//Question 5: Projects Showcase (if any)
