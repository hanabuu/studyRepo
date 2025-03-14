// 配列の要素削除

const array = [0,1,2,3,4];
console.log(array);

/**
 * spiceは厳密には変更のメソッド
 * (ただし、ES6以降では非推奨である)
 * 引数
 * - start: 配列の変更を始めるゼロから始まるインデックス
 *   - 負の値の場合は配列の末尾からさかのぼって数える
 *   - 配列の長さより大きい(start > array.length)の場合は要素は削除されず、末尾にitemの個数分要素を追加する
 *   - startを省略した場合はなにも削除されない
 * - count: 配列の削除を行う個数
 * - ...item:配列に追加する要素。startで指定したインデックスから始まる
 */
array.splice(1,1)
console.log(array)

/**
 * ES6以降では新しいarrayを生成したほうがよい
 */
const newArray = array.filter(n => n!==2)
console.log(newArray)