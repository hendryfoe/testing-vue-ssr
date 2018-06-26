import { createApp } from './app';

export default context => {
  // since there could potentially be asynchronous route hooks or components,
  // we will be returning a Promise so that the server can wait until
  // everything is ready before rendering.
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp();
    const { url } = context;

    // set server-side router's location
    router.push(url);

    // wait until router has resolved possible async components and hooks
    router.onReady(async () => {
      const matchComponents = router.getMatchedComponents();
      // no matched routes, reject with 404
      if (!matchComponents.length) {
        return reject({ code: 404 });
      }

      try {
        await Promise.all(
          matchComponents.map(
            ({ asyncData }) =>
              asyncData && asyncData({ store, route: router.currentRoute })
          )
        );

        // After all preFetch hooks are resolved, our store is now
        // filled with the state needed to render the app.
        // When we attach the state to the context, and the `template` option
        // is used for the renderer, the state will automatically be
        // serialized and injected into the HTML as `window.__INITIAL_STATE__`.
        context.state = store.state;

        resolve(app);
      } catch (error) {
        reject(error);
      }
    }, reject);
  });
};
