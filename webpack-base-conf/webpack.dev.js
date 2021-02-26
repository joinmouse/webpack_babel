const webpack = require('webpack')
const webpackCommonConf = require('./webpack.common.js')
const { merge } = require('webpack-merge')
const { distPath } = require('./path')

module.exports = merge(webpackCommonConf, {
    mode: 'development',
    module: {
        rules: [
            // 直接引入图片 url
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            // window.ENV = 'development'
            ENV: JSON.stringify('development')
        })
    ],
    devServer: {
        port: 8080,
        open: true,  // 自动打开浏览器
        compress: true,  // 启动 gzip 压缩,
        proxy: {
            // 将本地 /api/xxx 代理到 localhost:3000/api/xxx
            '/api': 'http://localhost:3000'
        }
    }
})