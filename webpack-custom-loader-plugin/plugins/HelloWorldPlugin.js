class HelloWorldPlugin {
    apply(complier) {
        complier.hooks.done.tap('Hello World Plugin', () => {
            console.log('Hello World Plugin!');
        })
    }
}

module.exports = HelloWorldPlugin