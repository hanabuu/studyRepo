const arr1: number[] = [1,2,3];
const arr2: number[] = [4,5,6];

// スプレッド構文を使用したときと使用しないとき
// 使用するとそのまま入る。使用しないと配列の中に配列が入る
console.log([...arr1, arr2]);   // [1,2,3,[4,5,6]]
console.log(...arr1);           // 1 2 3 ([]忘れると配列じゃないかも？注意)
console.log(arr2);              // [4,5,6]

// 配列の結合
console.log([...arr1, ...arr2]) // [1,2,3,4,5,6]
// ちなみにjoin関数があるが、これはなんか結合というより・・・？
console.log(arr1.join('-'));    // '1-2-3'

// 配列のコピー
const clonedArr = [...arr1];
clonedArr[2] = 4;
console.log("arr1:" ,arr1, "clonedArr:", clonedArr);   // arr1: [1,2,3] clonedArr: [1,2,4]

// オブジェクトの結合
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };

const mergedObj = { ...obj1, ...obj2 };
console.log(mergedObj); // Output: { a: 1, b: 3, c: 4 } (bは被ってるからあと勝ち)

// オブジェクトのクローン
// Object.assign()と同じ。
// ただしシャロ―コピー(浅いコピー)のため注意が必要
// ディープコピー(深いコピー)は別で。。。
// https://zenn.dev/yusuke_docha/articles/d51c2ca86887e0
const clonedObj = { ...obj1 };
console.log(clonedObj); // Output: { a: 1, b: 2 }

// 関数の引数に使う
const sum = (a, b, c): number => {
    return a + b + c;
}
const numbers = [1, 2, 3];
console.log(sum(...numbers)); // Output: 6
console.log(sum(numbers));  // スプレッド構文でないと引数が足りないといわれる

// おまけ
// 上の関数(sum)は以下の書き方でもちゃんと動作する
// 一行のときはreturn書かなくても大丈夫??
// const sum = (a, b, c) => a + b + c;