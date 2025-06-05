// ========================================== 正常 ==========================================
const example = (foo: unknown) => {
  // 引数が文字列であることの判断
  if (typeof foo === "string") {
    return foo.length; // fooはstringとして推論される
  }
};

console.log(example("stringです"));

// ========================================== ダメなパターン ==========================================

// typeofの判断を別の関数で実施.戻り値はboolean
const isString1 = (test: unknown): boolean => {
  return typeof test === "string";
};

const example1 = (foo: unknown) => {
  console.log(isString1(foo));
  if (isString1(foo)) {
    return foo.length; // Error fooはまだunknownとして推論される
    // typescriptのコンパイラの型推論は関数スコープで完結してしまう。
    // そのため、isString1から帰ってくるものがtrueかfalseかわからない（バグでstringと評価していないかも？）
    // だからコンパイラはエラーにしてる。実際に動かすとstringなら動くからいいけど、バグなら大変
  }
};

console.log(example1("stringです"));
console.log(example1(222));

// ========================================== 正常なパターン ==========================================
// 戻り値として「引数 is 型」とすることで、戻り値がtrueだったら引数はその型であることをコンパイラがわかる
const isString2 = (test: unknown): test is string => {
  return typeof test === "string";
};

const example2 = (foo: unknown) => {
  console.log(isString2(foo));
  if (isString2(foo)) {
    return foo.length; // fooはstringとして推論される
    // isString2の返り値に「test is string」としてtrueの場合は引数で受け取ったtestはstring型であることを
    // コンパイラに教えることで、コンパイルエラーをなくすことができる
  }
};

console.log(example2("stringです"));
console.log(example2(222));

// ========================================== 活用例 ==========================================
const array = ["shinji", null, "asuka", "rei", undefined];
//型：const array: (string | null | undefined)[]

// 普通のfilter
const filtedArray = array.filter((val) => val != null); // ※val != nullでnullとundefinedを排除可能
console.log(filtedArray); //["shinji", "asuka", "rei"]
//※型：const filtedArray: (string | null | undefined)[]

// filterの戻り値をis句で指定
const filtedArray2 = array.filter((val): val is string => val != null); // ※val != nullでnullとundefinedを排除可能
console.log(filtedArray2); // ["shinji", "asuka", "rei"]
//※型：const filtedArray: (string)[]

// ========================================== 補足 ==========================================
// ちなみに、TypeScriptには、ユーティリティ型のNonNullable<T>があり、これを使うと型Tからnullとundefinedを排除できます。
// NonNullable<T>は、TypeScriptの内部実装的には下記のように実装されています。
// type NonNullable<T> = T extends null | undefined ? never : T;
// 使い方は別途調査
