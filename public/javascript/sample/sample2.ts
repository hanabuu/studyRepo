const test = () => {
    return {                    // 連想配列を返してるだけ（配列の要素に関数を入れて）
        testFnc: arg => {       // 連想配列のkeyがtestFunc, vlueが関数で引数にarg
            console.log(arg);
        },
    }
}

// 変数aには関数が入った連想配列が入る
const a = test();
console.log(a);

// 連想配列のtestFuncを呼び出す。
a.testFnc(1);