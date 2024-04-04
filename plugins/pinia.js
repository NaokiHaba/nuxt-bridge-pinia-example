import { createPinia, PiniaVuePlugin, setActivePinia } from 'pinia'
import Vue from 'vue'

Vue.use(PiniaVuePlugin)

export default (context, provide) => {
  const pinia = createPinia()
  context.app.pinia = pinia

  // 複数のStoreがそれぞれのStoreに適切に紐づくようにする
  setActivePinia(pinia)

  // HACK: デフォルトはPiniaは自身のStoreインスタンスのみを参照するため、Piniaの内部プラグインに対してNuxtのコンテキストを渡す
  // https://github.com/vuejs/pinia/blob/v2/packages/pinia/src/store.ts#L698
  pinia._p.push(({ store }) => {
    Object.defineProperty(store, '$nuxt', { value: context })
  })

  if (process.server) {
    // nuxtServerInitの後にSSRの結果をフロントと同期（Nuxt3では不要）
    // レンダリング前にPiniaの状態をnuxtStateオブジェクトに保存しないと自動では同期されない
    context.beforeNuxtRender((ctx) => {
      ctx.nuxtState.pinia = pinia.state.value
    })
  } else if (context.nuxtState && context.nuxtState.pinia) {
    pinia.state.value = context.nuxtState.pinia
  }

  provide('pinia', pinia)
}
