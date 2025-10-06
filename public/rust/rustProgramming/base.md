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

変数の再宣言が可能

``` rust
let mut guess = String::new();

let guess: u32 = guess.trim().parse().expect("Err");
```

可変guessで宣言してるが、あとから不変guessで再宣言している。
型変換時によく使うらしい。

