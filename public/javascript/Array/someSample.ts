// 写真のサンプルデータ（オブジェクト配列）
const photoList: Object[] = [
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
 * オブジェクトの配列の検索
 * オブジェクトの配列の検索はsomeを使う
 */
const searchObjectArray = () => {
    const target: Object = {
        id: "002",
        name: "photo002.jpg"
    }
    const ret = photoList.some(
        list => list.id === target.id && list.name === target.name
    );
    console.log("searchObjectArray", ret);
}

searchObjectArray();