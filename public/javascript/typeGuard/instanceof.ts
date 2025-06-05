const getMonth = (date: string | Date): string | Date => {
  const isDate = date instanceof Date; // ※Typescript4.4以降の機能だが、instanceof等の結果を変数に入れられる
  if (isDate) {
    // 月を取得して１を足したものを返す
    return date.getMonth() + 1;
  }
  return date;
};

console.log(getMonth("20250605"));

let d = new Date();
console.log(getMonth(d));
