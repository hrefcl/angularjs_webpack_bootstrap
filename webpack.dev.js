const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require("webpack");
const Dotenv = require('dotenv-webpack');
const path = require("path");
var autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    devtool: "source-map",
    devServer: {
        contentBase: './src/public',
        compress: true,
        port: 8080
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.LoaderOptionsPlugin({
            test: /\.scss$/i,
            options: {
                postcss: {
                    plugins: [autoprefixer]
                }
            }
        }),
        new HtmlWebpackPlugin({
            template: './src/public/index.html',
            inject: 'body'
        }),
        // Load .env file for environment variables in JS
        new Dotenv({
            path: "./.env"
        }),

        // Extracts CSS into separate files
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "[id].css"
        }),
    ],
});
