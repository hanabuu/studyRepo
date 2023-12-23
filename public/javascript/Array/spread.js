const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Concatenate arrays using spread operator
const concatenatedArr = [...arr1, arr2];
const concatenatedArr2 = [...arr1, ...arr2];
console.log(concatenatedArr);  // [1,2,3,[4,5,6]]
console.log(concatenatedArr2); // [1,2,3,4,5,6]

const str = "Hello";
// Spread characters of a string into an array
const charArray = [...str];
console.log(charArray);  // Output: ['H', 'e', 'l', 'l', 'o']

const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };

// Merge objects using spread operator
const mergedObj = { ...obj1, ...obj2 };
console.log(mergedObj); // Output: { a: 1, b: 3, c: 4 }

// Clone an object using spread operator
const clonedObj = { ...obj1 };
console.log(clonedObj); // Output: { a: 1, b: 2 }

// Pass array elements as arguments to a function using the spread operator
const numbers = [1, 2, 3];

const sum = (a, b, c) => a + b + c;

console.log(sum(...numbers)); // Output: 6