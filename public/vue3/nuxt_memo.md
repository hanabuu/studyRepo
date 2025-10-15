# nuxtjs

## install

* 以下どちらでも同じものができた。ただパッケージマネージャーの選択とgitだとか
* あと、node,npmのバージョンが古い(node:20.12.2, npm:10.6.0)とエラーが出て、インストールできないので、voltaで最新をインストールしておくこと。
``` bash
> npx create-nuxt-app sample-nuxt
> npm create nuxt@latest [プロジェクト名]
```

* 実行結果
```
Need to install the following packages:
create-nuxt@3.29.3
Ok to proceed? (y) y
> npx
> create-nuxt sample-nuxtjs
        .d$b.
       i$$A$$L  .d$b
     .$$F` `$$L.$$A$$.
    j$$'    `4$$:` `$$.
   j$$'     .4$:    `$$.
  j$$`     .$$:      `4$L
 :$$:____.d$$:  _____.:$$:
 `4$$$$$$$$P` .i$$$$$$$$P`

ℹ Welcome to Nuxt!
ℹ Creating a new project in sample-nuxtjs.

✔ Which package manager would you like to use?
npm
◐ Installing dependencies...

> postinstall
> nuxt prepare

✔ Types generated in .nuxt

added 610 packages, and audited 612 packages in 3m

140 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
✔ Installation completed. 


✔ Would you like to install any of the official modules?
No

✨ Nuxt project has been created with the v4 template. Next steps:
 › cd sample-nuxtjs
 › Start development server with npm run dev
```

* 実行
  * [-- -o]があると勝手にブラウザ立ち上げてくれる

``` bash
> npm run dev -- -o
```

## 構成

components,pages,layoutsのフォルダ作ればそれで自動的に使える的なことを書いてるがほんとか？

## 参考

[nuxt](https://nuxt.com/)
