const path = require('path')
//引入插件
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const webpack = require('webpack');

module.exports = {
    entry: {
        index: './src/js/index.js',
    },
    output: {
        filename: './js/[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        // minimizer: [
        //     new OptimizeCSSAssetsPlugin({}),
        //     new UglifyJsPlugin({
        //         cache: true,
        //         parallel: true,
        //     }),
        // ],
        // splitChunks: {
        //     cacheGroups: {
        //         styles: {
        //             name: './css/index',
        //             test: /\.css$/,
        //             chunks: 'all',
        //             enforce: true
        //         }
        //     }
        // },
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [{
                        loader: 'file-loader',
                        options: {
                            name: './[name].html'
                        }
                    },
                    {
                        loader: 'extract-loader'
                    },
                    {
                        loader: 'html-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../css',
                        }
                    },
                    "css-loader"
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: './img/[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        // new CleanWebpackPlugin(['dist']),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "./css/[name].css",
            path: path.resolve(__dirname, 'dist')
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}