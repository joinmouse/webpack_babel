const path = require("path")
const { srcPath } = require("./path")
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        main: path.join(srcPath, "index")
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
            //     test: /\.less$/,
            //     use: [
            //         {
            //           loader: "style-loader",
            //         },
            //         {
            //           loader: "css-loader",
            //         },
            //         {
            //             loader: "less-loader",
            //             options: {
            //                 lessOptions: {
            //                     strictMath: true,
            //                 }
            //             }
            //         }
            //     ],
            //     exclude: /node_modules/
            // }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(srcPath, "index.html"),
            filename: 'index.html'
        })
    ]
}