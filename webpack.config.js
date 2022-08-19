const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin, ProvidePlugin, NormalModuleReplacementPlugin } = require("webpack");
const fs = require("fs");
const { GitRevisionPlugin } = require("git-revision-webpack-plugin");
// const gitRevisionPlugin = new GitRevisionPlugin();

module.exports = {
  entry: "./src/index.tsx",
  mode: process.env.NODE_ENV || "development",
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
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    fallback: {
      fs: false,
      tls: false,
      net: false,
      path: false,
      zlib: false,
      http: false,
      https: false,
      stream: false,
      crypto: require.resolve("crypto-browserify"),
      os: require.resolve("os-browserify/browser"),
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public")
    },
    historyApiFallback: true,
    port: 3000
  },
  plugins: [
    new DefinePlugin({
      DEV: true,
      'process.env': JSON.stringify(process.env),
      "process.versions": JSON.stringify(
         new GitRevisionPlugin().commithash().slice(0, 7)
      ),
      DEPLOYED_ADDRESS: JSON.stringify(
        fs.readFileSync("deployedAddress", "utf8").replace(/\n|\r/g, "")
      ),
      DEPLOYED_ABI:
        fs.existsSync("deployedABI") && fs.readFileSync("deployedABI", "utf8"),
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
}