const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

const { relativePath } = require('./utils');

module.exports = merge(baseConfig, {
  entry: relativePath('../src/entry-client.js'),
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /([\\/]node_modules[\\/]|!\.css$)/,
          chunks: 'all'
        },
        manifest: {
          name: 'manifest',
          chunks: 'all',
          minChunks: Infinity
        },
      },
    },
  },
  plugins: [
    // This plugins generates `vue-ssr-client-manifest.json` in the
    // output directory.
    new VueSSRClientPlugin(),
  ],
});
