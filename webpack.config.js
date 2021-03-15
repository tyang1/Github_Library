const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: { index: path.resolve(__dirname, 'src', 'index.jsx') },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      { test: /\.(jsx)$/, use: 'babel-loader' },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
  ],
  devServer: {
    // contentBase: path.join(__dirname, 'dist'),
    publicPath: '/',
    historyApiFallback: true,
    // compress: true,
    port: 8001,
  },
};
