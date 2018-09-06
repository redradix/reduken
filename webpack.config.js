var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: {
    set: './src/set/index.js',
    list: './src/list/index.js',
    entities: './src/entities/index.js',
    hash: './src/hash/index.js',
    pagination: './src/pagination/index.js',
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, ''),
    filename: '[name].js',
    library: ['reduken', '[name]'],
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env'],
          plugins: [require('@babel/plugin-proposal-object-rest-spread')]
        }
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
}
