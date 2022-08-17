module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            'process.env.REACT_APP_IMAGESTORAGE': JSON.stringify(process.env.REACT_APP_IMAGESTORAGE),
        })
    ],
}