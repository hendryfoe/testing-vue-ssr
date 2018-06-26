const ExtractTextPlugin = require('extract-text-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const { relativePath } = require('./utils');


// CSS extraction should only be enabled for production
// so that we still get hot-reload during development.
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: relativePath('../dist'),
    publicPath: '/dist/',
  },
  module: {
    noParse: /es6-promise\.js$/,
    rules: [
      {
        test: '/.js$/',
        exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // enable CSS extraction
          extractCSS: isProduction,
        },
      },
      {
        test: /\.css$/,
        // important: use vue-style-loader instead of style-loader
        use: isProduction
          ? ExtractTextPlugin.extract({
            use: 'css-loader',
            fallback: 'vue-style-loader',
          })
          : ['vue-style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    // isProduction
    //   ? new ExtractTextPlugin({ filename: 'common.[chunkhash].css' })
    //   : null,
    new VueLoaderPlugin(),
  ],
};
