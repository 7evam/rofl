const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
// const { env } = require('process');

module.exports = (webpackServe, options) => {

  var ENV_CONFIG

  if(options.mode === 'development'){
    ENV_CONFIG = new Dotenv({path: './.env.dev'})
  }

  if(options.mode === 'production'){
    if(options.env && options.env.environment === 'staging'){
      ENV_CONFIG = new Dotenv({path: './.env.staging'})
    } else {
      ENV_CONFIG = new Dotenv({path: './.env'})
    }
  }

  return {
    mode: options.mode,
    entry: "./src/index.js",
    output: {
      path: path.join(__dirname, '/dist'),
      filename: 'index_bundle.js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use:  [{
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react']
            }
          }],
          // exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
          ]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.(jpe?g|png|gif)$/i,
          use: {
            loader: 'file-loader'
          },
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/,
          use: {
            loader: 'url-loader'
          }
        }
      ]
    },
    // webpack 5 no longer supports native node modules
    resolve: {
      fallback: {
        "os": false,
        "https": require.resolve("https-browserify"),
        "http": require.resolve("stream-http"),
        "crypto": require.resolve("crypto-browserify"),
        "vm": false,
        "assert": require.resolve("assert/"),
        "stream": require.resolve("stream-browserify")
      }
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
          },
    //   contentBase: path.join(__dirname, 'dist'),
      port: 3000,
    //   inline: true,
      hot: true,
      historyApiFallback: {
        index: '/'
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css'
      }),
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
      ENV_CONFIG
    ]
  }
};