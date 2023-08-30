'use strict'

/**
 * 配列操作サンプル
 * https://zenn.dev/rpf_nob/articles/javascript-array-manipulation
 * JavaScript の Array.some と Array.includes の使い分け、値・参照型の動作の違い
 * https://qiita.com/Nossa/items/4a425e57ec4b7eedb7cb
 * 配列操作いろいろ
 * https://www.wakuwakubank.com/posts/280-javascript-array-helper/#index_id4
 */

// 写真のサンプルデータ（オブジェクト配列）
const photoList = [
    {
        id: "001",
        name: "photo001.jpg",
        type: "jpg",
        dataUrl: "http://localhost:3000/data/photo001.jpg"
    },{
        id: "002",
        name: "photo002.jpg",
        type: "jpg",
        dataUrl: "http://localhost:3000/data/photo002.jpg"
    }
]

// 値の配列
const testList = [1,2,3,4,5,6];

/**
 * 任意のキーを取得するサンプル
 */
const getSomeKeyData = () => {
    // 配列データのkeyだけを取得する
    console.log(photoList.map(ret => ret.id));
}

/**
 * 配列の中を検索する
 * 値の配列(testList)の検索はincludesを使う
 */
const searchValue = () => {
    let test = 1;
    let test2 = 7;
    console.log("searchValue test", testList.includes(test));
    console.log("searchValue test2", testList.includes(test2));
}

/**
 * オブジェクトの配列の検索
 * オブジェクトの配列の検索はsomeを使う
 */
const searchObjectArray = () => {
    const target = {
        id: "002",
        name: "photo002.jpg"
    }
    const ret = photoList.some(
        list => list.id === target.id && list.name === target.name
    );
    console.log("searchObjectArray", ret);
}

const main = () => {
    getSomeKeyData();
    searchValue();
    searchObjectArray();
}

main()