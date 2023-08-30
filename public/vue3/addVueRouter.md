# vueRouterの導入

導入手順
1. [インストール](#インストール)
1. [router.ts作成](#routertsの作成)
1. [main.ts編集](#maintsの変更)
1. [App.vueで使う]()

## インストール

```
> npm install vue-router
```

## router.tsの作成

```src/router.ts```を作成する。

``` javascript
// import Vue from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
// router対象のコンポーネント(vueファイル)を指定する。
// import [モジュール] from [対象vueファイル]
import Home from './components/Home.vue'
import Edit from './components/Edit.vue'

// アドレス、名称、コンポーネントを指定する
// {path: [アドレス], name: [名称], component: [インポートしたコンポーネント]}
const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/edit', name: 'Edit', component: Edit },
]

// createRouter
const router = createRouter({
    history: createWebHistory(),
    routes,
})

// export
export default router
```

## main.tsの変更

main.tsでrouter.tsをインポートし、vueに認識させる

```
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
+import router from './router'

-createApp(App).mount('#app')
+createApp(App).use(router).mount('#app')
```

これでrouterが使えるようになる。

## App.vueで使う

``` <router-link to="[router.tsで指定したアドレス]">[文字列]</router-link> ```でリンクを作成し、```<router-view />```に表示する。

## 参考

[VueRouter公式](https://v3.router.vuejs.org/ja/)
[VueRouterの基本とルーティングを構築するはじめの一歩](https://www.ritolab.com/posts/180)
