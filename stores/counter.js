import { defineStore } from "pinia"

export const useCounterStore = defineStore(
  "counter",
  {
    state: () => ({
      count: 0,
      user: null
    }),
    getters: {
      getCounter() {
        return this.count
      },
      getUser() {
        return this.user
      }
    },
    actions: {
      increment() {
        this.count++
      },
      async fetch() {
        console.log("SSR")
        try {
          const res = await fetch('https://jsonplaceholder.typicode.com/users/1')
            .then((response) => response.json())
            .then((data) => data)

          this.user = JSON.parse(JSON.stringify(res))
        } catch (e) {
          console.error(e)
        }
      }
    }
  })
