interface testObj {
    a: number
    b: String
}

const arr1: number[] = [1,2,3];
const associativeArray: testObj[] = [
    { a: 1, b: "2" }, { a: 2, b: "3" }
]

console.log(arr1.length);                            // 3
console.log(associativeArray.length);                // 2
console.log(Object.keys(associativeArray).length);   // 2

[1,2,3].forEach(value => {
    console.log(value);
})

let i:number = 0;
do {
    console.log(arr1[i]);
    i++;
} while(i<3);

for(let i:number=0; i<arr1.length; i++){
    console.log(arr1[i]);
}