/**
 * 非同期実行関数
 * ランダム秒まってから結果を返す
 * 引数で与えられた値を2倍にした結果を返す
 */
const aFunc = data => {
    return new Promise(function(callback){
      
      // ランダム秒まって結果を返す
      setTimeout(function() {
        callback(data * 2);
      }, Math.random() * 1000);
      
    })
  }
  
  /**
   * 非同期実行関数
   * 10秒まってから結果を返す
   * callbackの関数を簡略化（javascriptはかき方が色々ある。）
   */
  const bFunc = () => {
    return new Promise((callback) => {
      //10秒まつだけ
      setTimeout(function(){
        callback();
      },10000);
    })
  }
  
  //1. コールバックにて戻り値を処理する
  aFunc(100).then(function(data){
    console.log("1. " + data);
  });
  
  //2. 1のコールバックの記載をアロー関数を用いて簡略化
  aFunc(200).then((data) => {
    console.log("2. " + data);
  });
  
  //1と2はまだ非同期となりバラバラに処理される
  //以下にてそれそれ同期的に処理をさせる
  //bFuncは1,2の後に処理したいから一応10秒空けるため作った
  bFunc().then(() => {
    console.log("1,2の処理待つための10秒");
    return aFunc(100);
  }).then(function(data){
    console.log("3.1 " + data);
    return aFunc(data);            //returnでaFuncのPromiseを返してthenで処理実行(Promiseチェーン)
  })
  .then((data) => {
    console.log("3.2 " + data);
    return aFunc(data);  
  })
  .then((data) => {
    console.log("3.3 " + data);
  });
  
  //Promiseの正式な関数はmemo.mdに記載