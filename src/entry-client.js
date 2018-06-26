import Vue from 'vue';

import { createApp } from './app';

Vue.mixin({
  beforeMount() {
    const { asyncData } = this.$options;
    if (asyncData) {
      // assign the fetch operation to a promise
      // so that in components we can do `this.dataPromise.then(...)` to
      // perform other tasks after data is ready
      this.dataPromise = asyncData({
        store: this.$store,
        route: this.$route,
      });
    }
  },
  async beforeRouteUpdate(to, from, next) {
    const { asyncData } = this.$options;

    if (asyncData) {
      try {
        asyncData({
          store: this.$store,
          route: to,
        });
        next();
      } catch (error) {
        next();
      }
    } else {
      next();
    }
  },
});
// client-specific bootstrapping logic...

const { app, router, store } = createApp();

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

// this assumes App.vue template root element has `id="app"`
router.onReady(() => {
  app.$mount('#app');
});
