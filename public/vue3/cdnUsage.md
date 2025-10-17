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