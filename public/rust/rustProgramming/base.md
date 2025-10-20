# 基礎部分

## 変数宣言

* 可変(mutable)

``` rust
let mut hoge = "42"
```

* 不変(immutable)

``` rust
let hoge = "42"
```

* 型定義

``` rust
let hoge: i32 = 42
```

## 定数

``` rust
const MAX_POINTS: u32 = 100_000;
```

* Rustの定数の命名規則は、 全て大文字でアンダースコアで単語区切りすることです
* 値の型(上記だとu32)は必ず必要
* 定数は定数式にしかセットできないことです。関数呼び出し結果や、実行時に評価される値にはセットできません。
* 定数は、プログラムが走る期間、定義されたスコープ内でずっと有効

## ループ

``` rust
loop {
    ・・・
}
```

## エラー処理

ライブラリによってResult型が返されるので、それを```expect```等で取得する。
以下ioライブラリでの例

``` rust
use std::io

io::stdin().read_line(&mut guess).expect("行の読み込みに失敗しました");
```

ioライブラリではio::Resultの型で返ってくる。このときio::Resultは列挙型となる。大体列挙型みたいだけど。
列挙子はOkかErr。
ioライブラリのio::Result型はexpectメソッドがあり、Errの場合に呼び出せばプログラムをクラッシュさせ止めることができる。

例えば、文字列から数値の変換はクラッシュさせる場合とさせない場合で以下のように変更可能。

* クラッシュする

``` rust
let guess: u32 = guess.trim().parse().expect("数値を入力してください！");
```

* クラッシュしない
``` rust
let guess: u32 = match guess.trim().parse() {   // 変数guessをu32型に変換、parse()の結果をmatchで処理
    Ok(num) => num,                             // 成功した場合、numを返す
    Err(_) => continue,                         // 失敗した場合、ループの先頭に戻る
};
```

## シャドーイング

* 変数の再宣言が可能
  * 必ずletで同じ変数名で使うこと。letで再宣言しないとコンパイルエラー
  * ただしmutにしているのとは違って、覆い隠している。覆い隠すことでスコープを抜けたらスコープ内で行ったシャドーイングは消える。([シャドーイングのスコープ](#シャドーイングのスコープ))
* 実質新しい変数を生成していることになるので型を変えながら同じ変数名を使いまわせる。

``` rust
let mut guess = String::new();

let guess: u32 = guess.trim().parse().expect("Err");
```

* 可変guessで宣言してるが、あとから不変guessで再宣言している。
* 型変換時によく使うらしい。**上記の例だとstring型からu32の数値になっている。**
* シャドーイングで再宣言することを**2番目の変数に覆い隠された**というらしい。英語の直訳だからあってるか？

### シャドーイングのスコープ

* 変数のスコープを利用して以下のようにも使える

``` rust
fn main() {
    let x = 5;
    let x = x + 1;          //シャドーイングで元のx=5に1を加えてx=6になる

    {                       // スコープを区切る
        let x = x * 2;      //6を二倍する
        println!("The value of x in the inner scope is: {}", x);
    }                       // ここでx=x*2のシャドーイングは終了し、x=6に戻る

    // x=6が出力される
    println!("The value of x is: {}", x);
}
```

## データ型について

* **Rustは静的型付言語である**
* 変数に型がなくても型推論は働くが、複雑な型が推論される場合は型注釈をつけないとだめ。
  * 以下は型注釈(: u32)がないとコンパイルエラーが発生する。

  ``` rust
  let guess: u32 = "42".parse().expect("Not a number!");
  ```

### スカラー型

#### 整数型

* これはC言語と同じでしょう。

|大きさ|符号付き|符号なし|
|--|--|--|
|8-bit|i8|u8|
|16-bit|i16|u16|
|32-bit|i32|u32|
|64-bit|i64|u64|
|arch|isize|usize|

* Rustの数値リテラル
  * バイトリテラルを除く数値リテラルは全て、 型接尾辞(例えば、57u8)と_を見た目の区切り記号(例えば、1_000)に付加することができます。

|数値リテラル|例|
|--|--|
|10進数|98_222|
|16進数|0xff|
|8進数|0o77|
|2進数|0b1111_0000|
|バイト (u8だけ)|b'A'|

#### 浮動小数点

* Rustの浮動小数点型は、f32とf64で、それぞれ32ビットと64ビットサイズです。基準型はf64です。 なぜなら、現代のCPUでは、f32とほぼ同スピードにもかかわらず、より精度が高くなるからです。
  * 浮動小数点数は、IEEE-754規格に従って表現されています。f32が単精度浮動小数点数、 f64が倍精度浮動小数点数です。

``` rust
fn main() {
    let x = 2.0; // f64

    let y: f32 = 3.0; // f32
}
```

#### 数値演算

* 基本は同じかな
* 全部は[これ](https://doc.rust-jp.rs/book-ja/appendix-02-operators.html)

``` rust
fn main() {
    // addition
    // 足し算
    let sum = 5 + 10;

    // subtraction
    // 引き算
    let difference = 95.5 - 4.3;

    // multiplication
    // 掛け算
    let product = 4 * 30;

    // division
    // 割り算
    let quotient = 56.7 / 32.2;
    let floored = 2 / 3; // Results in 0
                         // 結果は0

    // remainder
    // 余り
    let remainder = 43 % 5;
}
```

#### 論理値型

* ```true```と```false```
*  Rustの論理値型は、boolと指定されます。

``` rust
fn main() {
    let t = true;

    let f: bool = false; // with explicit type annotation
                         // 明示的型注釈付きで
}
```

#### 文字型

* Rustのchar型は、 言語の最も基本的なアルファベット型であり、以下のコードでその使用方法の一例を見ることができます。 (charは、ダブルクォーテーションマークを使用する文字列に対して、シングルクォートで指定されることに注意してください。)
* Rustのchar型は、**ユニコード**のスカラー値を表します。

``` rust
fn main() {
    let c = 'z';
    let z = 'ℤ';
    let heart_eyed_cat = '😻';    //ハート目の猫
}
```

#### 複合型

* タプルと配列

##### タプル

* 複数の型の何らかの値を一つの複合型にまとめ上げる手段です。
* タプルは、丸かっこの中にカンマ区切りの値リストを書くことで生成します。タプルの位置ごとに型があり、 **タプル内の値はそれぞれ全てが同じ型である必要はありません。**

``` rust
fn main() {
    let tup: (i32, f64, u8) = (500, 6.4, 1);
}
```

###### 個々の値の取り出し

* 分配

``` rust
fn main() {
    let tup = (500, 6.4, 1);                // タプル生成
    let (x, y, z) = tup;                    // 個別の変数に変換
    println!("The value of y is: {}", y);   // yでアクセス可能
}
```

* ピリオドで添え字
  * 添え字は0始まり
``` rust
fn main() {
    let x: (i32, f64, u8) = (500, 6.4, 1);      // タプルを変数xで宣言
    let five_hundred = x.0;                     // 0番目にアクセス
    let six_point_four = x.1;                   // 1番目にアクセス
    let one = x.2;                              // 2番目にアクセス
}
```

##### 配列

* 考え方はタプルと同じ
* タプルと異なり、配列の全要素は、 同じ型でなければなりません。
* Rustの配列は、他の言語と異なっています。Rustの配列は、 固定長なのです: 一度宣言されたら、サイズを伸ばすことも縮めることもできません。
* 配列に入れる要素は、角かっこ内にカンマ区切りリストとして記述します。(すべて同じ値なら[値; 配列長さ]で簡潔化できる)
* **配列は、ヒープよりもスタックにデータのメモリを確保したい時、 または、常に固定長の要素があることを確認したい時に有効です。**

``` rust
fn main() {
    let a = [1, 2, 3, 4, 5];                    // 型注釈なし（推論）
    let a: [i32; 5] = [1, 2, 3, 4, 5];          // 型注釈あり
    let a = [3; 5];                             // 簡単な初期化(let a = [3, 3, 3, 3, 3];と同等)
}
```

###### 配列のアクセス

* ここら辺は他と同じ

``` rust
fn main() {
    let a = [1, 2, 3, 4, 5];

    let first = a[0];
    let second = a[1];
}
```

###### 配列要素への無効なアクセス

* 配列の終端を超えてアクセスすると、コンパイルは通るが、実行時にエラーが発生する

``` rust
use std::io;

fn main() {
    let a = [1, 2, 3, 4, 5];

    println!("Please enter an array index.");
           // 配列の何番目の要素にアクセスするか指定してください

    let mut index = String::new();

    io::stdin()
        .read_line(&mut index)
        .expect("Failed to read line");
              // 値の読み込みに失敗しました

    let index: usize = index
        .trim()
        .parse()
        .expect("Index entered was not a number");
        　　　// 入力された値は数字ではありません

    let element = a[index];

    println!(
        "The value of the element at index {} is: {}",
        // {}番目の要素の値は{}です
        index, element
    );
}
```

indexに5以上の値を入力すると、以下のようなエラーが発生する

``` text
thread 'main' panicked at 'index out of bounds: the len is 5 but the index is 10', src/main.rs:19:19
スレッド'main'は'範囲外アクセス: 長さは5ですが、添え字は10でした', src/main.rs:19:19
でパニックしました
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
```

コンパイルでは何もエラーが出なかったものの、プログラムは実行時エラーに陥り、 正常終了しませんでした。要素に添え字アクセスを試みると、言語は、 指定されたその添え字が配列長よりも小さいかを確認してくれます。添え字が配列長よりも大きければ、言語はパニックします。 パニックとは、プログラムがエラーで終了したことを表すRust用語です。

これは、実際に稼働しているRustの安全機構の最初の例になります。低レベル言語の多くでは、 この種のチェックは行われないため、間違った添え字を与えると、無効なメモリにアクセスできてしまいます。 Rustでは、メモリアクセスを許可し、処理を継続する代わりに即座にプログラムを終了することで、 この種のエラーからプログラマを保護しています。