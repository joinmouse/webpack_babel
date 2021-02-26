const path = require("path")
const { srcPath } = require("./path")
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        index: path.join(srcPath, "index.js"),
        other: path.join(srcPath, "other.js")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"],
                exclude: /node_modules/
            },
            // {
            //     test: /\.sass$/,
            //     use: [
            //         {
            //           loader: "style-loader",
            //         },
            //         {
            //           loader: "css-loader",
            //         },
            //         {
            //             loader: "sass-loader"
            //         }
            //     ],
            //     exclude: /node_modules/
            // }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(srcPath, "index.html"),
            filename: 'index.html',
            // chunks 表示该页面要引用哪些 chunk （即上面的 index 和 other），默认全部引用
            chunks: ["index", "vendor", "common"]
        }),
        new HtmlWebpackPlugin({
            template: path.join(srcPath, "other.html"),
            filename: "other.html",
            chunks: ["other", "vendor", "common"]
        })
    ]
}