import Vue from 'vue';
import { sync } from 'vuex-router-sync';

import App from './App.vue';
import { createRouter } from './router';
import { createStore } from './store';

// export a factory function for creating fresh app, router and store
// instances
export function createApp() {
  const router = createRouter();
  const store = createStore();

  // sync so that route state is available as part of the store
  sync(store, router);

  const app = new Vue({
    // inject router into root Vue instance
    router,
    // inject store into root Vue instance
    store,
    // the root instance simply renders the App component.
    render: h => h(App),
  });

  // expose the app, the router and the store.
  return { app, router, store };
}
