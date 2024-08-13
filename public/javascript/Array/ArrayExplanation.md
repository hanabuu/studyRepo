# 配列操作について

## 要素数取得

* 配列における要素数の取得方法
  * ただの配列の場合
    * (配列).lengthで取得可能。
    ```
    const arr1: number[] = [1,2,3];
    console.log(arr1.length)                            // 3
    ```
  * 連想配列(オブジェクト)の場合
    * (連想配列).lengthで取得可能だが、コンパイラが配列と認識していない場合は取得不可。
    * 取得できない場合は[Object.keys()](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)で取得可能。
    ```
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

* 基本的には[ループ]()と同じ。ここではこんな書き方もできる例を出す。

    * 変数じゃなくてもいけるんかーい
    ```
    [1,2,3].forEach(value => {
        console.log(value);
    })
    ```

## 重複削除
以下がお気に入り

``` javascript
const arrayB = [...new Set(arrayA)];
```

[JavaScriptで配列の重複を削除する方法](https://qiita.com/kotakin_dev/items/a19a5a2359144e3ecf1c)

[JavaScriptの配列の使い方まとめ。要素の追加,結合,取得,削除。](https://qiita.com/takeharu/items/d75f96f81ff83680013f)

[【JavaScript】ちょっとした配列操作tips](https://zenn.dev/rpf_nob/articles/javascript-array-manipulation)

[JavaScript の Array.some と Array.includes の使い分け、値・参照型の動作の違い](https://qiita.com/Nossa/items/4a425e57ec4b7eedb7cb)

[配列操作(追加, 削除, filter, map, reduceなど)](https://www.wakuwakubank.com/posts/280-javascript-array-helper/#index_id4)