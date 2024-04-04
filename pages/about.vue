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
    })
  }
};
</script>

<template>
  <div>
    <h1>ユーザー詳細</h1>
    {{ userInfo}}
  </div>

</template>

