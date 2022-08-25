const { merge } = require('webpack-merge');
const { config } = require('dotenv');
const { DefinePlugin } = require("webpack");
const path = require("path");
const common = require('./webpack.common.js');

config({path:"./dev.env"});

module.exports = merge(common, {
	mode: 'development',
	devServer: {
		static: {
			directory: path.join(__dirname, "public")
		},
		historyApiFallback: true,
		port: 3000
	},
	plugins: [
		new DefinePlugin({
			'process.env': JSON.stringify(process.env),
		})
	],
});