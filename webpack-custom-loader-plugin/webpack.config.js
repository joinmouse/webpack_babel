const path = require("path")
const HelloWorldPlugin = require('./plugins/HelloWorldPlugin')
const HelloCompilationPlugin = require("./plugins/HelloCompilationPlugin")
const HtmlPlugin = require("./plugins/HtmlPlugin")

module.exports = {
    mode: "development",
    entry: "./src/custom.js",
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js/,
                use: [
                    // 从下到上的顺序
                    {
                        loader: path.resolve(__dirname, "./loaders/loader2")
                    },
                    {
                        loader: path.resolve(__dirname, "./loaders/loader1")
                    }
                ]
            }
        ]
    },
    plugins: [
        new HelloWorldPlugin(),
        new HelloCompilationPlugin(),
        new HtmlPlugin()
    ]
}