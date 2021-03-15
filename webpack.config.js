const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  return {
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
      new webpack.DefinePlugin({
        'process.env.API_URL': JSON.stringify(`${env.API_URL}`),
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
};
