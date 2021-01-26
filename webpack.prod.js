const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const webpack = require("webpack");
const path = require("path");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = merge(common, {
    mode: 'production',
    devServer: {
        contentBase: './dist',
        compress: true,
        port: 8083
    },
    output: {
        publicPath: '/',
        filename: '[name].[fullhash].js',
        path: __dirname + '/dist',
    },
    plugins: [
        new ImageminPlugin({
            // disable for dev builds
            test: /\.(jpe?g|png|gif)$/i,
            pngquant: { quality: '70-85' },
            optipng: { optimizationLevel: 9 }
        }),
        new HtmlWebpackPlugin({
            template: './dist/index.html',
            inject: 'body'
        }),
        new webpack.NoEmitOnErrorsPlugin(),

        // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
        // // Minify all javascript, switch loaders to minimizing mode
        // new webpack.optimize.SplitChunksPlugin(),
        // new webpack.optimize.MinChunkSizePlugin(),

        // Copy assets from the public folder
        // Reference: https://github.com/kevlened/copy-webpack-plugin
        new CopyWebpackPlugin({
            patterns: [
                { from: __dirname + '/src/public' }
            ],
        })
    ]
});
