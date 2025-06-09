# ジェネレーター

## 活用
### 参考

[JavaScriptジェネレータ関数とユーティリティで楽に配列を生成する](https://qiita.com/honey32/items/5aef662b6a763373f1fd)

```　js
 * 渡されたジェネレータ関数を実行して、配列にする。
 */
export const generateArray = <T>(generatorFn: () => Generator<T, void>,): T[] => {
  return Array.from(generatorFn());
};

const nums2 = generateArray<number>(function* () {
  yield 1;
  yield* [2, 3];
});
```

``` js
// 使わないでfromだけ
const nums1 = Array.from<number>((function* () {
    yield 1;
    yield* [2, 3];
  })(),
);
```

### URL
[ジェネレータとyield式](https://qiita.com/axoloto210/items/bd6e08c21008d9fb8621)
[yield - MDN Web Docs](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/yield)