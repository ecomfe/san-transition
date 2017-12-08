const path = require('path')

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: [/node_modules/, /src/]
      },
      {
        test: /\.js$/,
        use: ['babel-loader', 'istanbul-instrumenter-loader?esModules=true'],
        include: /src/,
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  }
}
