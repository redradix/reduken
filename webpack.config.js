const path = require('path')

module.exports = {
  mode: 'production',

  entry: {
    set: './src/set/index.js',
    list: './src/list/index.js',
    entities: './src/entities/index.js',
    hash: './src/hash/index.js',
    pagination: './src/pagination/index.js',
    main: './src/index.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'reduken',
    libraryTarget: 'umd',
    globalObject: 'this'
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
