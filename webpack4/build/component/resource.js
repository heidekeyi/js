const {initName, initResource} = require('./tools');
module.exports = {
    test: {
        img: {
            test: /\.(jpg|png|gif)$/,
        },
        font: {
            test: /\.(woff2|woff|ttf|eot|svg)$/
        },
        html: {
            test: /\.html$/
        }
    },
    loader: {
        // 处理html中img的src属性
        // 依赖url-loader拷贝图片
        html: 'html-loader',
        initFont(path = 'assets/font', is_cache = false) {
            return {
                // 字体（iconfont导入会使用css-loader）
                // 处理其它没有指定的文件类型类似
                // 除了指定的文件类型之外
                // exclude : /\.(css|js|html|less)$/,
                loader: 'file-loader',
                options: initResource(path, is_cache)
            };
        },
        initImg(path = 'assets/img', is_cache = false) {
            return {
                // 处理图片
                // 依赖file-loader
                loader: 'url-loader',
                options: {
                    // 图片大小小于8k, 会被base64处理
                    limit: 8 * 1024,
                    // [hash:8] 取hash前8位
                    // [ext] 取原来的扩展名
                    name: initName(is_cache),
                    outputPath: path,
                    // 修正图路径引用问题思路
                    publicPath: '/' + path
                }
            };
        }
    },
    plugin: {
        initHtmlWebpackPlugin(pathname, is_minify = true) {
            const HtmlWebpackPlugin = require('html-webpack-plugin');
            let plugin;
            if (!pathname) {
                plugin = new HtmlWebpackPlugin();
            } else if (!is_minify) {
                plugin = new HtmlWebpackPlugin({
                    template: pathname,
                    minify : false
                });
            } else {
                plugin = new HtmlWebpackPlugin({
                    template: pathname,
                    minify: {
                        removeComments: true,
                        collapseWhitespace: true
                    }
                });
            }
            return plugin;
        },
        initCleanWebpackPlugin() {
            const {CleanWebpackPlugin} = require('clean-webpack-plugin');
            return new CleanWebpackPlugin();
        }
    }
}