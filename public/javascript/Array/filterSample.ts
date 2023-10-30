const photoList = [
    {
        id: "001",
        name: "photo001.jpg",
        type: "jpg",
        dataUrl: "http://localhost:3000/data/photo001.jpg"
    }
]

const _dataDefine = [
    {
        lRecodeName: "photoList",
        lFieldName: "id",
        
    }
]

photoList.forEach(element => {
    const datacolum = this._dataDefine.filter(def => {
        return def.lRecodeName === tableName && def.lFieldName === element && def.defineValue === element.data
    });
});