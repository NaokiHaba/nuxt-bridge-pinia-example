import { defineStore } from "pinia"

export const useUserStore = defineStore(
  "user",
  {
    state: () => ({
      userInfo: null
    }),
    actions: {
      async fetchUserByID() {
        const res = await this.$nuxt.$axios.$get("/users/1")
        this.$patch({ userInfo: res })
      }
    }
  })
