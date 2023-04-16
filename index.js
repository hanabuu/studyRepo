/* 1. expressモジュールをロードし、インスタンス化してappに代入。*/
const express = require("express");
// 読み込んだexpressモジュールを実体化してインスタンス
const app = express();

//import multer from 'multer'
const bodyParser = require('body-parser')

/* 2. listen()メソッドを実行して3000番ポートで待ち受け。*/
const server = app.listen(3001, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
});

// json request をparseするための処理
app.use(bodyParser.urlencoded( {extended: false} ));
app.use(bodyParser.json());

/* 3. 以後、アプリケーション固有の処理 */

// 静的なwebページのファイル一式を読み込む方法。publicはフォルダ名
// https://www.i-ryo.com/entry/2020/04/16/215205
app.use(express.static('public'));