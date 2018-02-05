var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        set: './set/index.js',
        list: './list/index.js',
        entities: './entities/index.js',
        hash: './hash/index.js',
        main: './index.js'
    },
    output: {
        path: path.resolve(__dirname, ''),
        filename: '[name].js',
        library: ["reduken", "[name]"],
		libraryTarget: "umd"
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
};