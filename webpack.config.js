const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
   // mode: 'development',
   entry: {
      app: './js/index.js'
   },
   module: {
      rules: [{
         test: /\.js$/,
         exclude: /node_modules/,
         use: {
            loader: "babel-loader"
         }
      },
      {
         test: /\.(gif|png|jpe?g|svg|xml)$/i,
         use: {
            loader: "file-loader",
            options: {
               name: '[name].[ext]'
            }
         }
      },
      {
         test: /\.mp3$/,
         use: 'file-loader'
      },
      ]
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: './index.html',
         chunks: ['app'],
         filename: 'index.html'
      }),
   ],
   // devServer: {
   //    contentBase: './dist',
   // },
   output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'www'),
      // clean: true
   },
};