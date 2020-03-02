const Path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: Path.resolve(__dirname, '../src/js/main.js'),
    index: Path.resolve(__dirname, '../src/js/index.js'),
    login: Path.resolve(__dirname, '../src/js/login.js'),
    products: Path.resolve(__dirname, '../src/js/products.js'),
    cart: Path.resolve(__dirname, '../src/js/cart.js')
  },
  output: {
    path: Path.join(__dirname, '../build'),
    filename: 'js/[name].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['main', 'index'],
      template: Path.resolve(__dirname, '../src/index.html')
    }),
    new HtmlWebpackPlugin({
      filename: 'login.html',
      chunks: ['login'],
      template: Path.resolve(__dirname, '../src/login.html')
    }),
    new HtmlWebpackPlugin({
      filename: 'products.html',
      chunks: ['main','products'],
      template: Path.resolve(__dirname, '../src/products.html')
    }),
    new HtmlWebpackPlugin({
      filename: 'cart.html',
      chunks: ['main','cart'],
      template: Path.resolve(__dirname, '../src/cart.html')
    }),
  ],
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        }
      },
    ]
  }
};
