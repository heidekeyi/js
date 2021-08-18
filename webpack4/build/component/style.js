const {initName} = require('./tools');
module.exports = {
    test: {
        css: {
            test: /\.css$/
        },
        less: {
            test: /\.less$/
        }
    },
    loader: {
        // 生成style标签，设置hot后自动更新
        style: 'style-loader',
        css: 'css-loader',
        initPostcss() {
            const postcssPresetEnv = require('postcss-preset-env');
            return {
                // css兼容不同浏览器
                loader: 'postcss-loader',
                options: {
                    ident: 'postcss',
                    // package.json中browserslist
                    plugins: () => [postcssPresetEnv()]
                }
            };
        },
        less: 'less-loader',
        initMiniCssLoader() {
            return require('mini-css-extract-plugin').loader
        }
    },
    plugins: {
        initMiniCssExtractPlugin(pathname = 'assets/css/bundle.css', is_cache = false) {
            // 避免闪屏，生成单独的css文件
            const MiniCssExtractPlugin = require('mini-css-extract-plugin');
            return new MiniCssExtractPlugin({
                filename: initName(is_cache, pathname)
            });
        },
        initOptimizeCssAssetsWebpackPlugin() {
            // css压缩
            const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
            return new OptimizeCssAssetsWebpackPlugin();
        }
    }
}