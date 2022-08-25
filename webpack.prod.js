const { merge } = require('webpack-merge');
const { config } = require('dotenv');
const { DefinePlugin } = require("webpack");
const path = require("path");
const common = require('./webpack.common.js');

config({ path: "./.env" });

module.exports = merge(common, {
	mode: 'production',
	plugins: [
		new DefinePlugin({
			'process.env': JSON.stringify(process.env),
		})
	],
});