const {initExtensions} = require('./partial');
module.exports = {
    extensions: {
        ts: initExtensions(['.ts', '.tsx', '.js']),
        js: initExtensions(['.js', '.json', '.ts', '.tsx'])
    },
    test: {
        js: {
            test: /\.js$/,
            exclude: /node_modules/,
        },
        ts: {
            test: /.tsx?$/,
            exclude: /node_modules/,
        }
    },
    loader: {
        ts: 'ts-loader',
        eslint: {
            // eslint语法检查
            // package.json中配置校验规则
            // "eslintConfig": {
            //     "extends": "airbnb-base"
            // }
            loader: 'eslint-loader',
            options: {
                // 自动修复eslint错误
                fix: true
            }
        },
        initBabel(is_cache = false) {
            const options = {
                // 指示babel作怎么样的兼容处理
                // presets: ['@babel/preset-env']
                presets: [
                    [
                        // 一般的语法转换es6=>es5
                        '@babel/preset-env',
                        {
                            // 按需加载
                            useBuiltIns: 'usage',
                            // corejs 版本
                            corejs: {
                                version: 3
                            },
                            // 指定兼容具体要求
                            targets: {
                                chrome: '50',
                                firefox: '50',
                                ie: '8',
                                safari: '10'
                            }
                        }
                    ]
                ]
            };
            if (is_cache) {
                // 二次构建优先使用之前的缓存
                options.cacheDirectory = true;
            }
            return {
                loader: 'babel-loader',
                options
            }
        }
    }
}