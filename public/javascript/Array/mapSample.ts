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

/**
 * 任意のキーを取得するサンプル
 */
const getSomeKeyData = () => {
    // 配列データのidだけを取得する
    console.log(photoList.map(ret => ret.id));
}


const getSomesKeyData = () => {
    console.log(photoList.map(ret => {
        return [ret.id, ret.name];
    }));
    const result = [];
    let tmp = photoList.map(ret => {
        return [ret.id, ret.name];
    })
    // console.log(val)
    tmp.map(ret => result.push(ret))
    console.log(result)
}

getSomeKeyData();
getSomesKeyData();