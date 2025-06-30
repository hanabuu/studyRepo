# 配列操作について

[Array - MDN Web Docs](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array)

## 配列の静的プロパティ

|プロパティ|内容||
|--|--|--|
|[Array.from()](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/from)|新しい Array インスタンスを生成する。||
|Array.fromAsync()|非同期反復可能、反復可能、配列風オブジェクトを元に、新しい Array インスタンスを作成します。||
|Array.isArray()|配列であれば true を、配列でなければ false を返します。||
|[Array.of()](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/of)|可変個の引数から、引数の個数や型に関わらず、新しい Array インスタンスを生成します|コンストラクタとの違いは？|

## 配列のインスタンスプロパティ

これらのプロパティは Array.prototype で定義されており、すべての Array インスタンスで共有されます。

|プロパティ|内容||
|--|--|--|
|Array.prototype.constructor|このインスタンスオブジェクトを作成したコンストラクター関数です。 Array インスタンスの場合、初期値は Array コンストラクターです。|？|
|Array.prototype[Symbol.unscopables]|ES2015 版以前の ECMAScript 標準に含まれておらず、 with による文のバインドの目的には無視されるプロパティ名を含みます。|？|
|length|配列内の要素数を反映します。||

## インスタンスメソッド

|メソッド|内容||
|--|--|--|
|Array.prototype.at()|指定された位置にある配列の項目を返します。負の整数も指定可能で、末尾の項目から戻ります。||
|Array.prototype.concat()|この配列に他の配列や値を結合して新しい配列を返します。||
|Array.prototype.copyWithin()|配列内で配列内の連続した要素を複写します。||
|Array.prototype.entries()|新しい配列イテレーターオブジェクトを返します。このオブジェクトは、配列中のそれぞれの位置に対するキー/値の組を保持しています。||
|Array.prototype.every()|指定したテスト関数を配列中のすべての要素が満たした場合に true を返します。||
|Array.prototype.fill()|配列内の指定した開始位置から終了位置までの要素を固定値で埋めます。||
|Array.prototype.filter()|指定したフィルタリング関数が true を返す、配列中の要素を格納した新しい配列を生成します。||
|Array.prototype.find()|指定されたたテスト関数を満たす、配列の最初の要素の値を返します。適切な要素が見つからなかった場合は undefined を返します。||
|Array.prototype.findIndex()|指定されたテスト関数を満たす、配列の最初の要素の添字を返します。適切な要素が見つからなかった場合は -1 を返します。||
|Array.prototype.findLast()|指定されたたテスト関数を満たす、配列の最後の要素の値を返します。適切な要素が見つからなかった場合は undefined を返します。||
|Array.prototype.findLastIndex()|指定されたテスト関数を満たす、配列の最後の要素の添字を返します。適切な要素が見つからなかった場合は -1 を返します。||
|Array.prototype.flat()|すべての部分配列の要素を指定された深さまで再帰的に連結した新しい配列を返します。||
|Array.prototype.flatMap()|コールバック関数を呼び出し元の配列の各要素に適用し、その結果を一段階平坦化した新しい配列を返します。||
|Array.prototype.forEach()|配列中のそれぞれの要素について関数を呼び出します。||
|Array.prototype.includes()|この配列が特定の要素を含むかどうか判定し、その結果を true または false で返します。||
|Array.prototype.lastIndexOf()|指定された値と等しい値を持つ最後の (添字の一番大きい) 要素の添字を返します。見つからない場合、-1 を返します。||
|Array.prototype.indexOf()|指定された値と等しい値を持つ最初の（添字の一番小さい）要素の添字を返します。見つからない場合、-1 を返します。||
|Array.prototype.join()|配列のすべての要素を結合した文字列を返します。||
|Array.prototype.keys()|新しい配列イテレーターを返します。このオブジェクトは配列中の各添字のキーを保持します。||
|Array.prototype.map()|配列内のすべての要素に対して与えられた関数を呼び出し、その結果を格納した新しい配列を生成します。||
|Array.prototype.pop()|配列から最後の要素を取り除き、返値として返します。||
|Array.prototype.unshift()|配列の最初に 1 個以上の要素を追加し、配列の変更後の length を返します。||
|Array.prototype.push()|配列の最後に 1 個以上の要素を追加し、新しい配列の length を返します。||
|Array.prototype.reduce()|アキュムレーターと配列内のすべての要素に対して (左から右の順で) 関数を適用し、単一の値に還元します。||
|Array.prototype.reduceRight()|アキュムレーターと配列内のすべての要素に対して (右から左の順で) 関数を適用し、単一の値に還元します。||
|Array.prototype.reverse()|配列の要素の順番を逆転させます (最初の要素は最後に、最後の要素は最初になります)。||
|Array.prototype.shift()|配列から最初の要素を取り除き、その要素を返します。||
|Array.prototype.slice()|配列の一部を取り出して新しい配列として返します。||
|Array.prototype.some()|指定したテスト関数を配列中の少なくとも 1 個の要素が満たした場合に true を返します。||
|Array.prototype.sort()|配列内で要素を整列し、配列を返します。||
|Array.prototype.splice()|配列に対して複数の要素を追加したり取り除いたりします。||
|Array.prototype.toLocaleString()|配列とその要素を表すロケールに従った文字列を返します。Object.prototype.toLocaleString() メソッドを上書きします。||
|Array.prototype.toReversed()|元の配列を変更せずに、要素を逆順に並べた新しい配列を返します。||
|Array.prototype.toSorted()|元の配列を変更せずに、要素を昇順に並べた新しい配列を返します。||
|Array.prototype.toSpliced()|元配列を変更することなく、指定された位置の要素を除去または置き換えた新しい配列を返します。||
|Array.prototype.toString()|配列とその要素を表す文字列を返します。Object.prototype.toString() メソッドを上書きしています。||
|Array.prototype.values()|新しい配列イテレーターオブジェクトを返します。このオブジェクトは、配列中の各添字の値を保持します。||
|Array.prototype.with()|指定された位置の要素を指定された値で置き換えた新しい配列を、元の配列に変更を加えることなく返します。||
|Array.prototype[Symbol.iterator]()|既定では values() 関数を返します。||

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

[[JavaScript]someメソッドを使って配列をチェックする](https://zenn.dev/captain_blue/articles/how-to-use-some)
配列の要素をすべて調べてそれぞれ調べる対象のオブジェクトに存在するか調べてる。
