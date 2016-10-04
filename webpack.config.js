'use strict';
const Path = require('path');
const Clean = require('clean-webpack-plugin');
const Extract = require('extract-text-webpack-plugin');
const Html = require('html-webpack-plugin');
const Stats = require('webpack-stats-plugin').StatsWriterPlugin;
const Webpack = require('webpack');

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

const env = process.env.NODE_ENV;

const outputPath = Path.join(__dirname, env);
const extractCSS = new Extract({filename: 'styles-[contenthash].css', allChunks: true});

const getCSSLoaders = (env) => {
  if (env === 'development') {
    return [
      { loader: 'style-loader' },
      { loader: 'css-loader',
        options: {modules: true, localIdentName: '[local]__[hash:base64:5]'},
      },
    ];
  }

  return extractCSS.extract([
    { loader: 'css-loader',
      options: {modules: true, localIdentName: '[hash:base64:5]'},
    },
  ]);
};

const getPluginsForEnv = (env) => {
  if (env === 'production') {
    return [extractCSS];
  }

  return [];
}


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
        use: getCSSLoaders(env),
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
    new Webpack.LoaderOptionsPlugin({
      debug: true,
      options: {
        context: Path.join(__dirname, 'app')
      },
    })
  ].concat(getPluginsForEnv(env)),
};

