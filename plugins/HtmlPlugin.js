class HtmlPlugin {
    apply(compiler) {
        compiler.hooks.emit.tapAsync("HtmlPlugin", (compilation, callback) => {
            const filename = compiler.options.output.filename
            const html = `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                    <script src="${filename}"></script>
                </head>
                <body>
                    
                </body>
            </html>`
            // Insert this html into the webpack build as a new file asset:
            compilation.hooks.processAssets['index.html'] = {
                source: function () {
                    return html
                },
                size: function () {
                    return html.length
                }
            }
            console.log("html plugin complete")
            // 功能完成后调用 webpack 提供的回调
            callback()
        })
    }
}

module.exports = HtmlPlugin