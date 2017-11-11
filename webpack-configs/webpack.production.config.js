import webpack from 'webpack';
import Config from 'webpack-config';

let ExtractTextPlugin = require('extract-text-webpack-plugin');

export default new Config().extend('webpack-configs/webpack.base.config.js').merge({
    devtool: 'source-map',

    module: {
        rules: [
            /* js */
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    { loader: "babel-loader" },
                    { loader: 'eslint-loader' }
                ]
            },
            /* less */
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { sourceMap: true, minimize: true } },
                        { loader: 'less-loader', options: { sourceMap: true } }
                    ]
                })
            },
            /* css */
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { sourceMap: true, minimize: true } }
                    ]
                })
            }
        ]
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/common.js',
            minChunks: 2
        }),
        new ExtractTextPlugin({
            filename: "css/[name].css"
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ]
});