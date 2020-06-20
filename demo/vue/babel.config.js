module.exports = {
    presets: [
        [ '@vue/cli-plugin-babel/preset', {
            "polyfills": [ "es7.object.entries", "es6.promise" ],
            "useBuiltIns": "entry"
        } ],
    ]
}
