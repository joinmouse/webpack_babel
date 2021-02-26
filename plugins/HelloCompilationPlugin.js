class HelloCompilationPlugin {
    apply(complier) {
        complier.hooks.compilation.tap('HelloComplierPlugin', (compilation) => {
            compilation.hooks.optimize.tap('HelloOptimizePlugin', () => {
                console.log('HelloCompilationPlugin: Assets are being optimized.');
            })
        })
    }
}

module.exports = HelloCompilationPlugin