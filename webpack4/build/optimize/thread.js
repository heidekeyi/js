// 多进程打包
// step
//  在需要的任务添加thread-loader即可
// note
//  可以指定启用进程数，默认是核心数-1
//  打包处理耗时长有优势
//  打包会额外增加启用多进程的时间

const {
    partial,
    lint,
    tools,
    resource,
    optimize,
    merge
} = require('../component/interface');


module.exports = merge(
    partial.initEntry('./src/js/optimize.js'),
    partial.initOutput('dist'),
    partial.prod,
    partial.initPlugins(
        resource.plugin.initCleanWebpackPlugin(),
        resource.plugin.initHtmlWebpackPlugin()
    ),
    partial.initModule(
        tools.initRule(
            lint.test.js,
            // 处理js文件
            // babel处理之后使用多进程打包
            optimize.loader.initThread(),
            lint.loader.initBabel(),
            lint.loader.eslint,
        )
    )
)