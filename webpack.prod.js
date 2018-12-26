const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const DropConsoleWebpackPlugin = require('drop-console-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        publicPath: '/public/yz/videos/web/'
    }
    // plugins: [
    //     new DropConsoleWebpackPlugin({
    //         drop_log: true,
    //         drop_info: false,
    //         drop_warn: false,
    //         drop_error: false,
    //     })
    // ]
})