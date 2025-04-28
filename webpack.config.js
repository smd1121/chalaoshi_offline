const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');
const fs = require('fs');

// 读取数据文件并转换为 JavaScript 变量
function getDataFiles() {
  const dataDir = path.resolve(__dirname, 'chalaoshi_data');
  const files = fs.readdirSync(dataDir);
  const data = {};
  
  files.forEach(file => {
    if (file.endsWith('.csv')) {
      const content = fs.readFileSync(path.join(dataDir, file), 'utf-8');
      data[file] = content;
    } else if (file === 'gpa.json') {
      const content = fs.readFileSync(path.join(dataDir, file), 'utf-8');
      data[file] = content;
    } else if (file === 'teachers.csv') {
      const content = fs.readFileSync(path.join(dataDir, file), 'utf-8');
      data[file] = content;
    }
  });
  
  return `window.__CHALAOSHI_DATA__ = ${JSON.stringify(data)};`;
}

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: './'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.csv$/,
        type: 'asset/source'
      },
      {
        test: /\.json$/,
        type: 'json'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inlineSource: '.(js|css)$',
      inject: 'body',
      templateParameters: {
        dataScript: getDataFiles()
      }
    }),
    new HtmlInlineScriptPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false
    })
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue': '@vue/runtime-dom'
    }
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
    historyApiFallback: true,
    devMiddleware: {
      publicPath: './'
    }
  },
  experiments: {
    topLevelAwait: true
  }
}; 
