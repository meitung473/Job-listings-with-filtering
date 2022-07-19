const { merge } = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(baseWebpackConfig, {
    mode: "production",
    devtool: "nosources-source-map",
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2,
                            sourceMap: true,
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
        ],
    },
    optimization: {
        splitChunks: {
            chunks: "all",
        },
        minimizer: [new CssMinimizerPlugin()],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].[fullhash].css",
        }),
    ],
});
