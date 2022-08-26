const { merge } = require('webpack-merge');
const { config } = require('dotenv');
const { DefinePlugin } = require("webpack");
const path = require("path");
const common = require('./webpack.common.js');
const ClosurePlugin = require('closure-webpack-plugin');

config({ path: "./prod.env" });

module.exports = merge(common, {
	mode: 'production',
	devtool: 'source-map',
	plugins: [
		new DefinePlugin({
			'process.env': JSON.stringify(process.env),
		})
	],
	optimization: {
		minimizer: [
			new ClosurePlugin({ mode: 'STANDARD' }, {
				// compiler flags here
				//
				// for debugging help, try these:
				//
				// formatting: 'PRETTY_PRINT'
				// debug: true,
				// renaming: false
			})
		]
	}
});