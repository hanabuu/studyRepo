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
    },{
        id: "003",
        name: "photo003.jpg",
        type: "jpg",
        dataUrl: "http://localhost:3000/data/photo003.jpg"
    }
]

const target = photoList.filter(row => {
    return row.id === "001" && row.type === "jpg"
});

console.log(target)
// photoList.forEach(element => {
//     const datacolum = _dataDefine.filter(def => {
//         return def.id === element.id && def.type === element.type
//     });

//     console.log(datacolum);
// });