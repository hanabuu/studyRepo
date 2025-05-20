# forever

- [Node.jsアプリをLinux環境で常駐化させる　forever編](https://qiita.com/chihiro/items/24ca8ac81cb20c22b47e)

## install

```
$ npm install -g forever
```

-- -gでグローバルにインストールしないと使えないみたい。

## list表示

```
> forever list
```

## 起動

```
> cd 該当フォルダ
> forever start ファイル名.js
```

## 停止

```
> cd 該当フォルダ
> forever stop ファイル名.js
```

## 再起動

```
> cd 該当フォルダ
> forever restart ファイル名.js
```

## ファイルの中身が変わってもホットリロードしてくれるオプション