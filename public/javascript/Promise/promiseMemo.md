## javascriptの勉強
### 同期処理

参考)
[とほほのPromise入門](http://www.tohoho-web.com/ex/promise.html)
[async/await 入門（JavaScript）](https://qiita.com/soarflat/items/1a9613e023200bbebcb3)
[Node.js v10のfsでasync/await](https://qiita.com/sl2/items/fb500ff79b581ca88c26)

#### callbackについて

#### 非同期処理について
```
# node nonPromiseTest.js
```

#### promise
```
# node PromiseTest.js
```

* promise
```
new Promise(resolve,reject)
```

* resolve,rejectはそれぞれcallback関数を入れる
* サイトによってはokFunc,ngFunc等記載していているところもある
* 大体はpromiseの定義のところでfunction()で記載することが多い
* 書き方のパターン

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
  
  })
}
//上をアロー関数で記載
function myFunc(){
  new Promise((resolve,reject) => {
    
    ＊＊＊処理＊＊＊
    if(error){
      reject();      //失敗したとき
    } else {
      resolve();      //成功したとき
    }
      
  }) 
}
  
//正常異常関わらずcallbackで返す（javascriptだから省略できるのかも）
function myFunc(){
  new Promise((callback) => {
    
    ＊＊＊処理＊＊＊
    callback();      //結果返却
    
  })
}
```

* 実際に処理するのは以下の記述したとき
```
myFunc().then(function(result){
  console.log(result);
  ＊＊＊結果を受ける処理＊＊＊
});
```


#### await/async
* https://qiita.com/soarflat/items/1a9613e023200bbebcb3
