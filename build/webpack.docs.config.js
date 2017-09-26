const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname, '../docs'),
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.san$/,
        use: ['san-loader']
      },
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader']
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
      'docs': path.resolve(__dirname, '../docs')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../docs/template.html')
    })
  ]
}
