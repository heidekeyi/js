// 开发环境：打包速度快，调试友好
// HMR
// source-map
// 生产环境：打包速度，运行性能高
// oneof babel缓存 多进程打包 externals(cdn) dll
// hash-chunkhash-contenthash缓存
//  tree-shaking 代码分割 懒、预加载 PWA
const {initOptimization} = require('./partial');
module.exports = {
    loader: {
        initThread(cores) {
            const res = {
                // 进程数默认CPU核心数-1
                loader: 'thread-loader'
            };
            if (cores) {
                res.options = {
                    options: {
                        // 进程数量
                        workers: cores
                    }
                }
            }
            return res;
        }
    },
    split: {
        initSplitChunks() {
            return initOptimization({
                // 默认参数包含包大小范围（参看webpack官网）
                // 对满足条件的包处理
                // 第三方包打包成一个包
                splitChunks: {
                    chunks: 'all'
                }
            });
        },
        initRuntimeChunk() {
            return initOptimization({
                // 清理目录会无效
                // 为解决a引入b，b改变导致contenthash改变
                // 导致a缓存失败
                // 将contenthash打包为runtime文件
                runtimeChunk: {
                    name: entry => 'runtime-' + entry.name
                }
            })
        }
    },
    plugin: {
        initDllPlugin(pathname = 'dll/[name].manifest.json', library_name = '[name]_[hash:8]') {
            const webpack = require('webpack');
            const {resolve} = require('path');
            // 生成manifest.json，映射库和第三方包名
            return new webpack.DllPlugin({
                name: library_name,
                path: resolve(pathname),
                entryOnly: false
            })
        },
        initDllReferencePlugin(manifest_pathname, is_names = false, name = 'dll/[name].manifest.json') {
            const {DllReferencePlugin} = require('webpack');
            if (typeof manifest_pathname === 'string') {
                // 不打包映射的库
                return new DllReferencePlugin({
                    manifest: manifest_pathname
                });
            }
            return manifest_pathname
                .map(it => name.replace(/\[name]/, it))
                .map(it => new DllReferencePlugin({manifest: it}));
        },
        initAddAssetHtmlPlugin(path = 'dll') {
            const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
            // 自动打包库文件（*.js表示任意文件）
            return new AddAssetHtmlPlugin({
                filepath: path + '/*.js',
                outputPath: path,
                publicPath: '/' + path
            })
        },
        initGenerateSW() {
            const {GenerateSW} = require('workbox-webpack-plugin');
            return new GenerateSW({
                // 快速启动
                // 删除旧的service-worker
                // 生成service-worker.js文件
                clientsClaim: true,
                skipWaiting: true
            })
        }
    }
};