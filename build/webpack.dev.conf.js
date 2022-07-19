const { merge } = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");

// 配置檔合併 (第三步)
module.exports = merge(baseWebpackConfig, {
    mode: "development",
    devtool: "eval-cheap-module-source-map",
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
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
});
