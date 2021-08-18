// HMR 热模块替换
// step
//  设置hot:true
// note
//  开发时候自动更新内容
//   css style-loader 内部已实现
//   html 入口设置['entry', 'template']，意义不大
//   js 非入口有效，设置监听，每个文件都需要监听
//     if (module.hot) {
//         module.hot.accept('./print.js', function () {
//             console.log('Accepting the updated printMe module!');
//         })
//     }

// {
// 代理，解决跨域问题
// proxy : {
// 使用的规则
// '/api' : {
// 代理的实际域名
// target : 'http://xxxx'
// pathRewrite : {
// 正则替换（仅一次）
// '^/api' : '/'
// }
// }
// }
// }

const {
    partial,
    lint,
    tools,
    resource,
    style,
    merge
} = require('./component/interface');
const {resolve} = require('path');
const template = resolve('public/base.html');
const res = merge(
    // 入口
    // 同时监视模板文件的变化
    partial.initEntry([
        './src/js/base.js', template
    ]),
    // 开发环境
    partial.dev,
    // 输出
    partial.initOutput('dist'),
    partial.initServe('dist'),
    // 使用插件完成一些功能
    // 顺序不重要
    partial.initPlugins(
        // 清理输出目录
        resource.plugin.initCleanWebpackPlugin(),
        // 处理html文件（不传参默认模板）
        resource.plugin.initHtmlWebpackPlugin(template),
    ),
    // 文件加载优先寻找顺序
    lint.extensions.js,
    // 生成{module:rules}对象
    partial.initModule(
        // 处理js
        tools.initRule(

            lint.test.js,
            lint.loader.eslint,
        ),
        // 处理ts
        tools.initRule(
            lint.test.ts,
            lint.loader.ts
        ),
        // 处理css
        tools.initRule(
            style.test.css,
            style.loader.style,
            style.loader.css
        ),
        // 处理less
        tools.initRule(
            style.test.less,
            style.loader.style,
            style.loader.css,
            style.loader.less
        ),
        // 主要处理html中img标签src引入的文件
        tools.initRule(
            resource.test.html,
            resource.loader.html
        ),
        // 处理图片
        tools.initRule(
            resource.test.img,
            resource.loader.initImg()
        ),
        // 处理字体
        tools.initRule(
            resource.test.font,
            resource.loader.initFont()
        )
    )
);
module.exports = res;