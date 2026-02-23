const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { version } = require('./package.json');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    mode: isProduction ? 'production' : 'development',
    context: path.join(__dirname, 'src'),
    entry: {
      'content': './content.js',
      'background': './background.js',
      'popup/popup': './popup/popup.js',
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js',
    },
    resolve: {
      extensions: ['.js', '.vue'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        'vue$': 'vue/dist/vue.esm.js'
      }
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          exclude: /node_modules\/(?!webextension-polyfill)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.css$/,
          use: ['vue-style-loader', 'css-loader']
        },
        {
          test: /\.scss$/,
          use: ['vue-style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/'
          }
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(argv.mode)
        }
      }),
      // Updated CopyPlugin configuration for v6+
      new CopyPlugin({
        patterns: [
          { from: 'icons', to: 'icons' },
          { from: 'popup/popup.html', to: 'popup/popup.html' },
          {
            from: 'manifest.json',
            to: 'manifest.json',
            transform(content) {
              const manifest = JSON.parse(content.toString());
              manifest.version = version;
              
              if (!isProduction) {
                manifest.content_security_policy = "script-src 'self' 'unsafe-eval'; object-src 'self'";
              }
              
              return JSON.stringify(manifest, null, 2);
            }
          }
        ]
      })
    ],
    devtool: isProduction ? false : 'cheap-module-source-map',
    performance: {
      hints: false
    }
  };
};