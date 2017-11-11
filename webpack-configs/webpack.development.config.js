import webpack from 'webpack';
import Config from 'webpack-config';
const path = require('path');

let HtmlReloadPlugin = require('reload-html-webpack-plugin');

export default new Config().extend('webpack-configs/webpack.base.config.js').merge({
    devtool: 'inline-source-map',

    output: {
        publicPath: '/'
    },

    devServer: {
        port: 9000
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    { loader: "babel-loader" }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader', options: { sourceMap: true } },
                    { loader: 'less-loader', options: { sourceMap: true } }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader', options: { sourceMap: true } }
                ]
            }
        ]
    },

    plugins: [
        new HtmlReloadPlugin()
    ]
});