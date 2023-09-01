# npm

## proxy

### linux

* 追加

``` sh
npm -g config set proxy http://10.116.169.127:3128
npm -g config set https-proxy http://10.116.169.127:3128
npm -g config set registry http://registry.npmjs.org/
```

* 削除

``` sh
npm -g config delete proxy
npm -g config delete https-proxy
npm -g config delete registry
```

### windows


## 参考
[npm でプロキシを設定／解除する](https://qiita.com/ymaru/items/cf513ab05fe0ebac7d3b)