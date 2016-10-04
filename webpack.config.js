'use strict';
const Path = require('path');
const Clean = require('clean-webpack-plugin');
const Html = require('html-webpack-plugin');
const Stats = require('webpack-stats-plugin').StatsWriterPlugin;
const Webpack = require('webpack');

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

const outputPath = Path.join(__dirname, 'dist');
module.exports = {
  entry: Path.join(__dirname, 'app', 'index.js'),
  output: {
    path: outputPath,
    filename: '[name]_[hash].js',
  },
  resolve: {
    extensions: ['.js', '.css'],
  },
  module: {
    rules: [
      { test: /\.js$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader',
            query: {
              presets: [['es2015', {modules: false}]],
              plugins: ['transform-runtime'],
            },
          },
        ],
      },
      { test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader',
            options: {modules: true, localIdentName: '[hash:base64:5]'},
          },
        ],
      },
    ],
  },
  plugins: [
    new Webpack.EnvironmentPlugin('NODE_ENV'),
    new Clean(outputPath),
    new Stats({fields: null}),
    new Html({
      template: 'index.template',
      inject: 'body',
    }),
  ],
};
