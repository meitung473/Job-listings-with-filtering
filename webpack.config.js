const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.[fullhash].js",
        assetModuleFilename: "images/[hash][ext][query]",
    },
    module: {
        rules: [
            {
                test: /\.json$/i,
                type: "asset",
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader",
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2,
                        },
                    },
                    {
                        loader: "postcss-loader",
                    },
                    {
                        loader: "resolve-url-loader",
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.(png|jp(e*)g|gif)$/i,
                type: "asset/resource",
            },
            {
                test: /\.svg$/i,
                type: "asset",
                resourceQuery: /url/, // *.svg?url
            },
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
                use: [
                    {
                        loader: "@svgr/webpack",
                        options: {
                            svgoConfig: {
                                name: "preset-default",
                                params: {
                                    overrides: {
                                        removeViewBox: false,
                                    },
                                },
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[fullhash].css",
        }),
        new CleanWebpackPlugin(),
    ],
};
