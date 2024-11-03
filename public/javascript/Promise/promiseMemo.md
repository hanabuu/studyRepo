## javascript の勉強

### 同期処理

参考)
[とほほの Promise 入門](http://www.tohoho-web.com/ex/promise.html)
[async/await 入門（JavaScript）](https://qiita.com/soarflat/items/1a9613e023200bbebcb3)
[Node.js v10 の fs で async/await](https://qiita.com/sl2/items/fb500ff79b581ca88c26)

#### callback について

#### 非同期処理について

```
# node nonPromiseTest.js
```

#### promise

```
# node PromiseTest.js
```

- promise

```
new Promise(resolve,reject)
```

- resolve,reject はそれぞれ callback 関数を入れる
- サイトによっては okFunc,ngFunc 等記載していているところもある
- 大体は promise の定義のところで function()で記載することが多い
- 書き方のパターン

```
// 普通？
function myFunc(){
  new Promise(function(resolve,reject){

    ＊＊＊処理＊＊＊
    if(error){
      reject();      //失敗したとき
    } else {
      resolve();      //成功したとき
    }

  });
}
//上をアロー関数で記載
const myFunc = () => {
  new Promise((resolve,reject) => {

    ＊＊＊処理＊＊＊
    if(error){
      reject();      //失敗したとき
    } else {
      resolve();      //成功したとき
    }

  });
}

//正常異常関わらずcallbackで返す（javascriptだから省略できるのかも）
function myFunc(){
  new Promise((callback) => {

    ＊＊＊処理＊＊＊
    callback();      //結果返却

  })
}
```

- 実際に処理するのは以下の記述したとき

```
myFunc().then(function(result){
  console.log(result);
  ＊＊＊結果を受ける処理＊＊＊
});
```

#### await/async

- https://qiita.com/soarflat/items/1a9613e023200bbebcb3

** Promise を返す関数は await をつけるか.then()で戻り値をとること！！async 関数でない場合は.then()になる。async 関数内なら await でよい **

- 注意
  - await は forEach 等のコールバック関数の中では使えない。async 配下の処理の中でのみ有効
  - そのため、ループで処理する場合は for..of や、map で promise な配列を作成して、Promise.all で解決すること
  - [参考](https://dev.classmethod.jp/articles/foreach-async-await/)
  - 参考プログラムを書きたい・・・サイトが閉鎖されてもいいように

#### promiseAll

- 複数の処理がすべて終わるのを待つ
- 気を付けなければならないこと
