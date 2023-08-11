'use strict'

// 写真のサンプルデータ
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
 */
const searchValue = () => {
    let test = 1;
    let test2 = 7;
    console.log(testList.includes(test));
    console.log(testList.includes(test2));
}

const main = () => {
    getSomeKeyData();
    searchValue();
}

main()