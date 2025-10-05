// Rustではデフォルトで標準ライブラリが利用可能であるが、それに入らないものはuseでスコープに入れる必要がある
// 標準のものをprelude(プレリュード)と呼ぶ
use std::io;        //標準ライブラリstdの中のioモジュールをスコープに入れる

fn main() {
    println!("数を当ててごらん");

    println!("ほら、予想を入力してね");

    let mut guess = String::new();      // 可変(mutable)の変数guessを宣言、String::new()で新しい空の文字列を作成
    // let guess = "42";    // 変数guessを不変にする場合、再代入できないのでエラーになる mutで可変(immutable)にする

    io::stdin()                             // ioの中のstdin関数を呼び出し、標準入力ハンドルを取得(useしてなかったらstd::io::stdin()で使える))
        .read_line(&mut guess)              // 標準入力から1行読み込み、guessに格納する。&で参照を渡す、mutで可変にする
        .expect("行の読み込みに失敗しました");  // 結果をResult型で返す、expectでエラー時のメッセージを指定

    println!("次のように予想しました: {}", guess);
}