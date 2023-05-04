/**
 * 非同期実行関数
 * ランダム秒まってから結果を返す
 * 引数で与えられた値を2倍にした結果を返す
 */
const aFunc = (data, callback) => {

    // ランダム秒まって結果を返す
    setTimeout(function() {
      callback(data * 2);
    }, Math.random() * 1000);
    
  }
  
  // ①1. sample_callbackを使った場合は以下の関数コール
  const sample_callback = value => {
    console.log("1. " + value);
  }
  aFunc(100,sample_callback);
  
  // 2. 1を改良して関数を削減する(引数の中に関数を書いちゃう)
  aFunc(200, function(value) {
    console.log("2. " + value);
  });
  
  // 3. 実行した結果を使ってさらに処理をする場合
  //コールバック地獄と呼ばれる処理
  aFunc(300, function(value){
    console.log("3.1 " + value);
    aFunc(value, function(value){
      console.log("3.2 " + value);
      aFunc(value, function(value){
        console.log("3.3 " + value);
      });
    });
  });
  
  //上記の関数コールは全て非同期に実行されるため、処理順序がバラバラになる
  //何回か実行したら結果がわかるよ