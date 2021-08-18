// source-map
// 开发环境使用内联速度快，调试友好
// 线上调试友好？性能好？隐藏源码
// source-map 源代码到构建代码的映射
// inline-source-map 内联，一个source-map
// hidden-source-map 外部（单独文件），提示是构建后的位置
// eval-source-map 内联，每个文件都有一个source-map
// nosource-source-map 外部，没有源代码信息，完全隐藏
// cheap-source-map 外部，精确到行
// cheap-module-source-map 外部，精确到行，包含loader
//  打包速度：eval>inline>cheap
//  提示：source-map>cheap-module>cheap-source-map
// 开发：速度快，调试友好
//  速度：eval>eval-cheap
//  友好：source-map>cheap-module-source-map>cheap-source-map
//  选1：eval-source-map |eval-cheap-module-source-map
// 生产：隐藏源代码？提示友好
//  内联不推荐，代码体积大
//  nosources-source-map | hidden-source-map
//  source-map | cheap-module-source-map

const {resolve} = require('path');
const config = {
    initEntry(entry) {
        return {
            entry
        }
    },
    initOutput(path, pathname = 'js/[name].js', library_name = '[name]_[hash:8]', chunk_name = '[name].js') {
        // output
        //  filename
        //  path
        //  publicPath
        //  chunkFilename 0.js=>0_chunk.js
        //  library: [name] 其他文件可以引入使用name
        //  libraryTarget: window 挂载到某个上（这里window为例）
        return {
            output: {
                // 打包输出目录
                path: resolve(path),
                // 打包后名称
                filename: pathname,
                // 给chunk名称添加hash解决缓存
                chunkFilename: chunk_name,
                // 打包后暴露的名称（名称+hash)
                library : library_name
            }
        }
    },
    serve: {
        mode: 'development',
        // 便于调试
        devtool: 'eval-source-map'
    },
    dev: {
        mode: 'development',
        // 便于调试
        devtool: 'source-map'
    },
    prod: {
        mode: 'production',
        // 还可以隐藏源码后者不需要
        devtool: 'source-map'
    },
    initServe(server_root_path = 'dist', hot = true, open = true, port = 8888) {
        return {
            devServer: {
                contentBase: resolve(server_root_path),
                // 不压缩
                compress: false,
                port,
                // 自动打开浏览器
                open,
                // 只显示错误
                stats: 'errors-only',
                // 开启热模块替换
                hot
            }
        }
    },
    initPlugins(...plugins) {
        return {plugins};
    },
    initExtensions(extensions) {
        // 文件加载寻找顺序
        return {
            resolve: {
                extensions
            }
        }
    },
    initModule(...rules) {
        // 保证一种文件类型只会命中一次
        return {
            module: {
                rules: [
                    {
                        oneOf: rules
                    }
                ]
            }
        }
    },
    initCDN(glue = '--', ...packages) {
        // 'jquery--jQuery'
        // jQuery是包名（package.json中name字段）
        // jquery 模块名称，引入的路径
        //     externals: {
        //         jquery: 'jQuery'
        //     }
        const res = {};
        packages.map(it => it.split(glue))
            .forEach(([key, value]) => res[key] = value);
        return {externals: res};
    },
    initMode(mode = 'production') {
        return {mode};
    },
    initOptimization(optimization) {
        return {optimization};
    }
}

module.exports = config;