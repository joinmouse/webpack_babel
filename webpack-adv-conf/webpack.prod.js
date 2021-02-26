const webpack = require('webpack')
const { distPath } = require("./path")
const webpackCommonConf = require('./webpack.common.js')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge(webpackCommonConf, {
    mode: "production",
    output: {
        path: distPath,
        filename: "[name]_[contenthash].js"
    },
    module: {
        rules: [
            // 图片 - 考虑 base64 编码的情况
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        // 小于 5kb 的图片用 base64 格式产出
                        // 否则，依然延用 file-loader 的形式，产出 url 格式
                        limit: 5 * 1024,
                        outputPath: "/img1/"
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            // window.ENV = 'production'
            ENV: JSON.stringify("production")
        })
    ]
})