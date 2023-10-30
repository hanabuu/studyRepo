// 値の配列
const testList: number[] = [1,2,3,4,5,6];

/**
 * 配列の中を検索する
 * 値の配列(testList)の検索はincludesを使う
 */
const searchValue = () => {
    let test: number = 1;
    let test2: number = 7;
    console.log("searchValue test", testList.includes(test));
    console.log("searchValue test2", testList.includes(test2));
}

searchValue()