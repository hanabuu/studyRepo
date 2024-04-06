export type Options = {
  render: () => string
}

export type App = {
  mount: (selector: string) => void
}

export const createApp = (options: Options): App => {
  return {      // 連想配列を返してるだけ（配列の要素に関数を入れて）
    mount: selector => {  // 連想配列のkeyがmount, vlueが関数で引数にselector
      const root = document.querySelector(selector)
      if (root) {
        root.innerHTML = options.render()
      }
    },
  }
}


const app = createApp({
  render() {
    return 'Hello world.'
  },
})

// 連想配列のmountを呼び出す。
app.mount();