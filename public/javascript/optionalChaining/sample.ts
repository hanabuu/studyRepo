// オプショナルチェーン
// オブジェクトのプロパティが存在しない場合でもエラーを起こさずにプロパティが参照できる安全な方法
// https://typescriptbook.jp/reference/values-types-variables/object/optional-chaining
// https://zenn.dev/k_kind/articles/b3294647b28e01

// 以下の場合はエラーとなる
/** =======================
const book = undefined;
console.log(book.title);

const author = null;
console.log(author.email);
======================= */

/** =========通常のエラーチェック=============*/
// エラーを避けるには(通常の場合)
//  undefineの場合
const book = undefined;
const title = book === null || book === undefined ? undefined : book.title;
            // (book === null || book === undefined) ? undefined : book.title; null,undefinedかどうかのチェック。三項演算子
console.log(title);
//  titleがある場合の場合
const book2 = {title: "aaaa"};
const title2 = book2 === null || book2 === undefined ? undefined : book2.title;
console.log(title2);
// これだとネスとしたオブジェクト場合めちゃくちゃめんどくさい

/** =========オプショナルチェーン=============*/
// 使い方
//  cundefinedの場合
const book3 = undefined;
const title3 = book3?.title;
console.log(title3);
//  === titleがある場合
const book4 = {title: "aaaa"};
console.log(book4?.title);

//  === ネストされた場合も使える
const book5 = { author: {email: "test@exaple.com"} };
console.log(book5?.author?.email);

// 関数にも使える
//  === undefinedの場合
const increment = undefined;
console.log(increment?.(1));
//  === 関数の実態がある場合
const increment2 = <T>(arg: T): T => {
    return arg + 10;
}
console.log(increment2?.("a"));

// 配列要素の参照にも使える
//  === undefinedの場合
const books = undefined;
console.log(books?.[0]);
//  === 配列がある場合
const books1 = ["aa", "bb"];
console.log(books1?.[1]);

// typescriptでオプショナルチェーンを使った場合に得られる型
const books2 = ["aa", "bb"];
const b = books1?.[1];
console.log(typeof b);  // ほんとはここでundefinedとのユニオン型(string | undefined)になるらしい

// Null合体演算子と組み合わせる
//  == オプショナルチェーンでundefinedを返したときにデフォルト値を代入したい場合 ★★
const book7 = undefined;
const title7 = book7?.title ?? "デフォルトタイトル";
console.log(title7);
