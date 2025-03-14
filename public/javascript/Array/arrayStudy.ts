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

[1,2,3].forEach((value,index,array) => {
    // forEachのコールバック関数の引数は実は３つある
    // value: 現在処理中の配列要素
    // index: 現在処理中の配列インデックス(省略可)
    // array: forEachが呼び出されている配列(省略可)
    // callback関数のほかにthisArgがあるがよくわからないので、一旦無視する
    console.log(value, index, array);
})

let i:number = 0;
do {
    console.log(arr1[i]);
    i++;
} while(i<3);

for(let i:number=0; i<arr1.length; i++){
    console.log(arr1[i]);
}