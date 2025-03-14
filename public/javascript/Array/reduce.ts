// 配列の合計を算出する

let result = [48,75,92,61,54,83,76]
let user = [
    {name: "Yamada", result: 75},
    {name: "Suzuki", result: 91},
    {name: "Kudou", result: 80},
]
/**
 * 引数
 * - callback
 *   - sum:合計値保管用
 *   - element:要素の値
 *   - index:要素のインデックス(省略可能)
 *   - array:配列(省略可能) どう使うかわからない
 * - 初期値
 */
let total = result.reduce((sum, element,index,array) => {return sum+element}, 0)
let total2 = result.reduce((sum, element,index,array) => sum+element, 0)    //これでもいいみたい
console.log(total)
console.log(total2)

let userTotal = user.reduce((sum,element) => sum+element.result, 0)
console.log(userTotal)