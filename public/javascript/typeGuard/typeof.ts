/**
 * 数値と文字列変換
 * @input string | number
 * @return string
 * @note 引数が数値ならば文字列に変換して戻す。
 * @note 引数が文字列ならばそのまま戻す
 */
const numberToStirng = (value: string | number): string => {
    // typeofで引数の型を調べる
    if (typeof value === "number") {
        return value.toString();
    }
    return value;
};

console.log(numberToStirng("aaa"));
console.log(numberToStirng(01.0));

/**
 * 型について
 * Undefine型: "undefine"
 * Null型： "object" ※
 * 論理値型: "boolean"
 * Number: "number"
 * Bigint: "bigint"
 * 文字列: "string"
 * シンボル: "symbol"
 * 関数: "function"
 * その他のオブジェクト: "object"
 */

const numberToStirng2 = <T>(value: T) => {
  if (typeof value === "number") {
    return value.toString();
  }
  return value;
};

console.log(numberToStirng2("aaa"));
console.log(numberToStirng2(1));
