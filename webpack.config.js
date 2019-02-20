var webpack = require("webpack");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname + "/dist/",
        publicPath: 'dist/',
        filename: "bundle.js"
    },
    resolve: {
        unsafeCache: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/, use: [{
                loader: "style-loader",
            }, {
                loader: "css-loader",
            }]
            },
            {test: /\.(jpg|png|gif)$/, loader: "file-loader"},
            {test: /\.(glsl)$/, loader: "url-loader"},
            {test: /\.json$/, loader: "json-loader"},
            {test: /\.js$/, loader: 'babel-loader', options: {compact: false}}
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            mangle: {toplevel: true},
            minimize: true,
            sourceMap: false,
        })
    ]
};