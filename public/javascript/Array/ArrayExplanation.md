# 配列操作について

## 存在チェック（空判定）

* lengthでよくね？

```
if (array.length) {...}
if (!array.length) {...}
```

* [[JavaScript] 配列の存在チェック（空判定）は if (array.length) {...} でいいよって話](https://qiita.com/kozzzz/items/42108bc96b3a0e7c53d5)

## 要素数取得

* 配列における要素数の取得方法
  * ただの配列の場合
    * (配列).lengthで取得可能。

    ``` javascript
    const arr1: number[] = [1,2,3];
    console.log(arr1.length)                            // 3
    ```

  * 連想配列(オブジェクト)の場合
    * (連想配列).lengthで取得可能だが、コンパイラが配列と認識していない場合は取得不可。
    * 取得できない場合は[Object.keys()](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)で取得可能。

    ``` javascript
    interface testObj {
        a: number
        b: String
    }

    const associativeArray: testObj[] = [
        { a: 1, b: "2" }, { a: 2, b: "3" }
    ]

    console.log(associativeArray.length)                // 2
    console.log(Object.keys(associativeArray).length)   // 2
    ```

## ループ処理

* 基本的にはループと同じ。ここではこんな書き方もできる例を出す。
* 変数じゃなくてもいけるんかーい

    ``` javascript
    [1,2,3].forEach(value => {
        console.log(value);
    })
    ```

## 重複削除

以下がお気に入り

``` javascript
const arrayB = [...new Set(arrayA)];
```

## 検索系

* 配列vs配列の検索でヒットした配列を作り出す

``` javascript
const filteredArray = data.filter(elem=>{
    return searchTarget.some(elem2=>
        elem2 === elem.id
    )
})
```

* 逆にヒットした行を除外した配列を作り出すとき(arraySome.jsを参照)

``` javascript
const filteredArray = data.filter(elem=>{
    return !searchTarget.some(elem2=>
        elem2 === elem.id
    )
})
```

## 連想配列（JSON）におけるkey,valueの取得

```
const list = {
    id: 1,
    count: 10,
    propaty: "aaaa"
}

console.log(Object.keys(list));  // ['id', 'count', 'propaty']
console.log(Object.values(list)); // [1, 10, 'aaaa']
```

[JavaScriptで配列の重複を削除する方法](https://qiita.com/kotakin_dev/items/a19a5a2359144e3ecf1c)

[JavaScriptの配列の使い方まとめ。要素の追加,結合,取得,削除。](https://qiita.com/takeharu/items/d75f96f81ff83680013f)

[【JavaScript】ちょっとした配列操作tips](https://zenn.dev/rpf_nob/articles/javascript-array-manipulation)

[JavaScript の Array.some と Array.includes の使い分け、値・参照型の動作の違い](https://qiita.com/Nossa/items/4a425e57ec4b7eedb7cb)

[配列操作(追加, 削除, filter, map, reduceなど)](https://www.wakuwakubank.com/posts/280-javascript-array-helper/#index_id4)