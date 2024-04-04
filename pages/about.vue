<script>
import { useUserStore } from "~/stores/UserStore"
import { mapState } from "pinia"

export default {
  async fetch({ $pinia }) {
    const store = useUserStore($pinia)
    await store.fetchUserByID()
  },
  computed: {
    ...mapState(useUserStore, {
      userInfo: (state) => {
        return state.userInfo
      }
    }),
    isSSR() {
      return process.server
    }
  }
};
</script>

<template>
  <div>
    <h1>ユーザー詳細</h1>
    <p>現在のレンダリング方式: {{ isSSR ? 'SSR' : 'CSR' }}</p>
    {{ userInfo }}
  </div>

</template>

