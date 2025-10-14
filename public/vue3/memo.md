# 覚書

## 基本

[vue3覚書（props, emit, computed, ref）](https://qiita.com/yuta_vamdemic/items/258b2571de5786278193)

## ライフサイクル

|ライフサイクルフック名|実行タイミング|
|--|--|
|beforeCreate|data、methods等の初期化前|
|created|data、methods等の初期化後|
|beforeMount|<template>がHTMLに変換される前|
|mounted|<template>がHTMLに変換された後|
|beforeUpdate|dataが更新され、DOMに反映される前|
|updated|dataが更新され、DOMに反映された後|
|beforeDestroy / beforeUnmount|Vueインスタンスを破棄する前|
|destroyed / unmounted|Vueインスタンスを破棄した後|

[【Vue2 / Vue3】ライフサイクルフック](https://qiita.com/whopper1962/items/1a99169ba868f94e4c94#mounted)

## v-for 

* 単純ループのやり方
```
v-for="n in 10
```

## v-if

``` html
<div v-if="showModal" class="main-shadow"></div>
<button @click="showModal = true">モーダルを開く</button>
```

```js
const showModal = ref(false)
```