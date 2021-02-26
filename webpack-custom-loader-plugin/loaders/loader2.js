module.exports = function(source) {
    console.log("loader run 2")
    return source.replace(/var/g, "const")
}