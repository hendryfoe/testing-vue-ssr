const express = require('express');
const { createBundleRenderer } = require('vue-server-renderer');

const serverBundle = require('./dist/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/vue-ssr-client-manifest.json');

const app = express();
const template = require('fs').readFileSync('./index.template.html', 'utf-8');
const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false, // recommended
  template, // (optional) page template
  clientManifest, // (optional) client build manifest
});

const DEFAULTPORT = 8080;

app.use('/dist', express.static('./dist'));

app.get('*', async (req, res) => {
  // const context = { url: req.url };
  const context = {
    url: req.url,
    title: 'hello',
    meta: `
      <meta ...>
      <meta ...>
    `,
  };

  renderer.renderToString(context, (err, html) => {
    if (err) {
      if (err.code === 404) {
        res.status(404).end('Page not found');
      } else {
        res.status(500).end('Internal Server Error');
      }
    } else {
      res.send(html);
    }
  });
});

app.listen(DEFAULTPORT, () => {
  console.log(`Running on port ${DEFAULTPORT}`);
});
