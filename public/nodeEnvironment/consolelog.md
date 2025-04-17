# consoleLogの小技

## console.logを同じ所に出す

- 進捗とか出すのに便利
- readlineはnodejsに標準バンドルしてる

``` javascript
import readline from 'readline'

let time = 0

setInterval(() => {
  readline.cursorTo(process.stdout, 0);
  process.stdout.write(`time: ${++time}`);
}, 1000)
```

[参考](https://qiita.com/quzq/items/1452965295bfd374263c)

[[javascript] カラフルなconsole.log](https://qiita.com/oharu121/items/446027d9e4a494455555)
[console.logテクニック](https://zenn.dev/keiichiro/articles/ebd91551a5108d)

## console.log公式
[console.log() - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/console/log_static)