# expressについて

## CORSについて

ブラウザ -> Vue -> expressの場合、CORSポリシーに引っかかる。
[expressでCORSエラーが起きたらcorsで解決しよう](https://zenn.dev/luvmini511/articles/d8b2322e95ff40)

そのためExpress側にVueから来る要求においては許可しようということでcorsをミドルウェアに設定する必要がある
以下で実装可能
// cross origin resource sharingの設定
``` js
import cors form 'cors'

const app:express.Express = express()
app.use(cors({
    origin: 'http://ipaddr:port',  //アクセス許可するオリジン
    credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
    optionsSuccessStatus: 200 //レスポンスstatusを200に設定
}))
```
## 静的ディレクトリの参照

``` js
// /download/からのアクセスの場合に静的ディレクトリを対応しようとしたがうまくいかず・・・
// __dirnameがdistディレクトリ配下にいる・・・typescriptだから？
// ⇒【解決】index.jsの場所がdistディレクトリ配下だからpath.joinで__dirnameは指定してはダメ
// 普通にrootディレクトリからのパスを指定するだけでＯＫでした！
app.use(`/download/*`, express.static('downloadFile'))
// ダメだったやつ
// app.use("/download/*", ((req, res, next) => {
//     console.log("download links..." + __dirname);
//     next();
// }))

```

## GETRequestの拡張
HTTPリクエストにパラメータを入れたいとき
例えば以下のようなURLでunitnumにパラメータを入れる場合
http://10.116.164.96:3001/api/getSDDatasForTableGouki?table=xxxx&gouki=Gxxxxxx

``` js
import express, {Request} from 'express'

// インターフェースを設定。この時Requestを拡張してやる
interface getDataRequestForTabelGouki extends Request {
    query: {
      table: string
      gouki: string
    }
}

// reqの型を拡張したgetRakutyakuDataRequestにしてやる
app.get("/api/getSDDatasForTableGouki", function(req: getDataRequestForTabelGouki,res,next){
    // console.log(req.query.table);
    // console.log(req.query.gouki);
    const tablename = req.query.table;
    const gouki = req.query.gouki;

    if(tablename == undefined || gouki == undefined){
        res.status(500);
        res.send("bad request");
    } else {
        // パラメータ正常時の処理
    }    
});
```

[拡張参照１](https://qiita.com/manten120/items/aa87e6af01a0cb87109e)
[拡張参照２](https://tech.chakapoko.com/nodejs/express/params.html)

- ※postの場合は特に拡張以下の取り方でいける

```
interface setDbRequestBody {
    dbName: string
}

app.post("/api/setDb", (req,res,next) => {
    // console.log(req.body);
    const body: setDbRequestBody = req.body;
    if(body.dbName ===""){
        res.status(500);
        res.send("bad request")
    } else {
        // パラメータ正常時の処理
    }
})
```

## expressRouter機能


[サーバーサイド(Express) - 実装編](https://zenn.dev/is_ryo/books/10ef5a30196e16110bc1/viewer/81ffb5)