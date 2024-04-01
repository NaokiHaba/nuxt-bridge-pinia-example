import { createPinia } from 'pinia';
import Vue from 'vue';

export default ({ app }, inject) => {
  const pinia = createPinia();
  Vue.use(pinia);
  inject('pinia', pinia);
};
