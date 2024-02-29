# 基本操作

## ループ処理

* for
  * プログラムの基本文(説明するまでもなし)
  ```
  const arr1: number[] = [1,2,3];
  for(let i=0; i<arr1.length; i++){
    console.log(arr1[i]);
  }
  ```

* do ... while
  * これもプログラムの基本文
  * 中が実行されてからiを評価するので、最後の１回のやつがあるはず・・・(なんかよくあったけど忘れた)
  ```
  let i:number = 0;
  do {
    console.log(arr1[i]);
    i++;
  } while(i<3);
  ```

* while
  * これもプログラムの基本文
  * 中を実行する前にnを評価する。だから条件によって最後の１回が処理されなくてなんでってなることがあった。（なんかよくあったけど忘れた）
  * **無限ループに陥りやすいので注意**
```
let n:number = 0;
let x:number = 0;
while (n < 3) {
  n++;
  x += n;
}
```

* forEach
  ```
  const arr1: number[] = [1,2,3];
  arr1.forEach(value => {
    console.log(value);
  })
  ```