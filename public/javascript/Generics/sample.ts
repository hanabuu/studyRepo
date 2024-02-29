// Generics Exsample
// 以下参考
// https://zenn.dev/miz_dev/articles/typescript-generics
// https://qiita.com/k-penguin-sato/items/9baa959e8919157afcd4

// ========================================== 普通の場合 ==========================================
const basicTest1 = (arg: number): number => {
    return arg;
}
const basicTest2 = (arg: string): string => {
    return arg;
}

// 引数の型毎に関数を作ってた
console.log(basicTest1(1));
console.log(basicTest2("aaa"));

// ========================================== 関数の場合 ==========================================
// 上記の例をGenericsを使って簡単に書く
// ----- 関数を呼び出すときに<>で型を指定する
const test = <T>(arg: T): T => {
    return arg;
}
console.log(test<number>(1));
console.log(test<string>("aaa"));
console.log(test<number[]>([1,2]));
console.log(test<number>("aaa"));
// 引数から型が明示的にわかるのであれば<>を省略可能
console.log(test("bbb"));

// ----- 一つのGenericsを複数の引数で使う
const testss = <T>(arg1: T, arg2: T): T {
    return arg2;
}
console.log(testss<number>(1,2));
console.log(testss<string>("aaa", "bbb"));

// ----- 複数の引数も対応
const tests = <T,U>(arg1: T, arg2: U): U => {
    return arg2;
}

console.log(tests<number, string>(1, "aaa"));
console.log(tests<string, number>("aaa", 1));

// ========================================== クラスの場合 ==========================================
// クラスにも対応
class testClass<T> {
    private _item: T;

    constructor(item: T){
        this._item = item;
    }

    getItem(): T {
        return this._item;
    }
}

let class1 = new testClass<string>("aaa");
console.log(class1.getItem());

let class2 = new testClass<number>(1);
console.log(class2.getItem());

// もちろん省略も可
let class3 = new testClass("bbb");
console.log(class3.getItem())

// ========================================== インターフェースの場合 ==========================================
// インターフェースも対応
interface testInterface<T,U>{
    key: T;
    value: U;
}

let obj: testInterface<number, string> = {
    key: 1,
    value: "aa"
}
console.log(obj);

// もちろん省略も可
let obj1: testInterface = {
    key: "aa",
    value: 2
}
console.log(obj1);

// ========================================== 型の制約 ==========================================
// ----- 引数のTをstringだけに固定したい場合（本来それなら引数の型をstringにすればいいが）
const test3 = <T extends string>(arg: T): T => {
    return arg;
}
// (ここでエラーが出るはずだが、quokkaは実行されてる・・・)
console.log(test3(1));
　　　　　　// 型 'number' の引数を型 'string' のパラメーターに割り当てることはできません。

// ----- 例えば以下の関数(test4)の場合、引数のnameプロパティを返すが、引数にプロパティがない場合はundefinedになる
const test4 = <T>(arg: T): string => {
    return arg.name;
}
console.log(test4("aa"));

// test5だと引数の型を指定することができて、確実にプロパティを参照できる
interface argType {
    name: string;
}
const test5 = <T extends argType>(arg: T): string => {
    return arg.name;
}
console.log(test5({name: "aaa"}));
