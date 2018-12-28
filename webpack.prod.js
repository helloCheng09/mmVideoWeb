const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const DropConsoleWebpackPlugin = require('drop-console-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        filename: './js/[name].[hash].js',
        publicPath: '/public/yz/videos/web/'
    },
    optimization: {
        // runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        // new DropConsoleWebpackPlugin({
        //     drop_log: true,
        //     drop_info: false,
        //     drop_warn: false,
        //     drop_error: false,
        // })
        // new HtmlWebpackPlugin({
        //     // title: 'Output Management'
        //     title: 'Caching'
        // }),
        // new webpack.HashedModuleIdsPlugin(),
    ]
})