# テクニック集

## 簡易モーダル

``` html
<div id="app">
  <div>{{ message }}</div>
  <button @click="showModal = true">モーダルを開く</button>
  <div v-if="showModal" class="main-shadow">
    <div class="modal">
      <p>これはモーダルです</p>
      <button @click="showModal = false">閉じる</button>
    </div>
  </div>
</div>
```

``` js
<script type="module">
// <script>
  // import { createApp, ref } from './vue.esm-browser.js'
  import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
  // import { createApp, ref } from 'vue'
  // const { createApp, ref } = Vue


  createApp({
    setup() {
      const message = ref('Hello Vue!')
      const showModal = ref(false)
      return {
        message,
        showModal
      }
    }
  }).mount('#app')
</script>
```

``` css
/* モーダル以外を非活性にする */
.main-shadow {
  position:fixed;           /* ポジション固定 */
  top:0;                    /* 上から */
  left:0;                   /* 左から */
  width:100vw;              /* 最大幅 */
  height:100vh;             /* 最大高さ */
  background:rgba(0,0,0,0.5);
  display:flex;
  align-items:center;
  justify-content:center;
}
.modal {
  background:#fff;
  padding:2em;
  border-radius:8px;
  min-width:200px;
  min-height:100px;
}
```