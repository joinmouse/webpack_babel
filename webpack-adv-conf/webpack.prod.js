const webpack = require('webpack')
const { distPath } = require("./path")
const webpackCommonConf = require('./webpack.common.js')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 抽离css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//压缩css
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin') 

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
            },
            // css
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,   //不再是style-loader
                    "css-loader",
                    "postcss-loader"
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            // window.ENV = 'production'
            ENV: JSON.stringify("production")
        }),
        // 抽离css
        new MiniCssExtractPlugin({
            filename: 'css/main_[hash].css'
        })
    ],

    optimization: {
        minimize: true,
        minimizer: [
          // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
          "...",
          new CssMinimizerPlugin(),
        ],
        // 分割代码块
        splitChunks: {
            /**
             * initial 入口 chunk，对于异步导入的文件不处理
                async 异步 chunk，只对异步导入的文件处理
                all 全部 chunk
            */
            chunks: "all",
            // 缓存分组
            cacheGroups: {
                // 第三方模块
                vendor: {
                    name: "vendor",  //chunk名称
                    priority: 1, // 权限更高，优先抽离，重要！！！
                    test: /node_modules/,
                    minSize: 0,   // 大小限制
                    minChunks: 1  // 最少复用过几次
                },
                // 公共模块
                common: {
                    name: "common",
                    priority: 0, // 优先级
                    minSize: 0,  // 公共模块的大小限制
                    minChunks: 2  // 公共模块最少复用过几次
                }
            }
        }
    }
})