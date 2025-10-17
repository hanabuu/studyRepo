# CDN版の使い方

## ローカルで実現

1. CDNから```vue.global.js```をダウンロードする
1. ソースは以下の通り

``` html
<script src="./vue.global.js"></script>
```

``` js
<script>
    const { createApp, ref } = Vue;
    createApp({
      setup(){
        const message = ref([]);
        // ...
        return { message };
      }
    }).mount('#app');
</script>
```

## textareaでのjavascript側変数について

* 以下のコードだと、ブラウザ側から書き込んだデータが反映されない

``` html
<textarea>{{ value }}</textarea>
```

* {{}}は単なる差し込みのようで反映されないらしいので、以下のように変更することでtextareaでデータの反映ができる

``` html
<textarea v-model="value"></textarea>
```