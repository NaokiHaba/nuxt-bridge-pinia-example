<template>
  <div>
    <h1>Todo</h1>
    <p>Count: {{ counter.getCounter }}</p>
    <button @click="counter.increment">Increment</button>
    <div v-if="user">
      <p>Name: {{ user.name }}</p>
      <p>Email: {{ user.email }}</p>
    </div>
  </div>
</template>

<script>
import { useCounterStore } from "~/stores/counter"

export default {
  setup() {
    const counter = useCounterStore();
    return { counter };
  },
  async asyncData({ $pinia }) {
    const counter = useCounterStore($pinia);
    await counter.fetch();
    return { user: counter.getUser };
  }
};
</script>
