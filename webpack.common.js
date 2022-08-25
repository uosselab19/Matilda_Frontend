const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin, ProvidePlugin, NormalModuleReplacementPlugin } = require("webpack");
const fs = require("fs");
const { GitRevisionPlugin } = require("git-revision-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ["file-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      fs: false,
      http: false,
      https: false,
      net: false,
      os: require.resolve("os-browserify/browser"),
      path: false,
      stream: false,
      tls: false,
      url: false,
      zlib: false,
    },
  },
  plugins: [
    new DefinePlugin({
      "process.versions": JSON.stringify(
        new GitRevisionPlugin().commithash().slice(0, 7)
      ),
    }),
    new ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
    new NormalModuleReplacementPlugin(
      /^node:/,
      (resource) => {
        resource.request = resource.request.replace(/^node:/, '');
      },
    ),
    new NormalModuleReplacementPlugin(
      /^worker_threads/,
      (resource) => {
        resource.request = resource.request.replace(/^worker_threads/, '/');
      },
    ),
  ],
};