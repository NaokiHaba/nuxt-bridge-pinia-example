import { createPinia, PiniaVuePlugin, setActivePinia } from 'pinia'
import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import Vue from 'vue'

// PiniaをVueDevToolsと統合するためにPiniaVuePluginを使用
Vue.use(PiniaVuePlugin)

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia()

  // Vue2ではapp.useが使えないため、app.piniaにPiniaを設定
  nuxtApp.app.pinia = pinia

  // ActivePiniaを設定
  setActivePinia(pinia)

  // Piniaの内部プラグインStoreにnuxt/$axiosを渡す
  pinia._p.push(({ store }) => {
    Object.defineProperty(store, '$nuxtAxios', { value: nuxtApp.app.$axios })
  })

  if (process.server) {
    // サーバー側でPiniaの状態をnuxtStateオブジェクトに保存
    nuxtApp.beforeNuxtRender((ctx) => {
      ctx.nuxtState.pinia = pinia.state.value
    })
  } else if (nuxtApp.nuxtState && nuxtApp.nuxtState.pinia) {
    // クライアント側でPiniaの状態を復元
    pinia.state.value = nuxtApp.nuxtState.pinia
  }

  return {
    provide: {
      pinia
    }
  }
})
