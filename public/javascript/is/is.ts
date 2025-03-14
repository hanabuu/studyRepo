// [TypeScript の"is"と"in"を理解する](https://qiita.com/ryo2132/items/ce9e13899e45dcfaff9b)
const example = (foo: unknown) => {
    if (typeof foo === "string") {
      console.log(foo.length); // fooはstringとして推論される
    }
};

const isString1 = (test:unknown): boolean => {
    return typeof test === "string";
}

const example1 = (foo: unknown) => {
    if(isString1(foo)){
        console.log(foo.length);    // Error fooはまだunknownとして推論される
        // typescriptのコンパイラの型推論は関数スコープで完結してしまう。
        // そのため、isString1から帰ってくるものがtrueかfalseかわからない（バグでstringと評価していないかも？）
        // だからコンパイラはエラーにしてる。実際に動かすとstringなら動くからいいけど、バグなら大変
    }
}

const isString2 = (test: unknown): test is string => {
    return typeof test === "string";
}

const example2 = (foo: unknown) => {
    if(isString2(foo)){
        console.log(foo.length);    // fooはstringとして推論される
        // isString2の返り値に「test is string」としてtrueの場合は引数で受け取ったtestはstring型であることを
        // コンパイラに教えることで、コンパイルエラーをなくすことができる
    }
}

example("stringです");
example1("stringです");
example2("stringです");
