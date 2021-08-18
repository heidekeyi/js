// PWA 渐进式网络开发应用程序
// step
//  1 使用插件 GenerateSW
//  2 入口文件注册navigator.serviceWorker.register
//     if ('serviceWorker' in navigator) {
//         window.addEventListener('load', () => {
//             navigator.serviceWorker.register('/service-worker.js')
//                 .then((registration) => {
//                     console.log('SW registered: ', registration);
//                 })
//                 .catch((registrationError) => {
//                     console.log('SW registration failed: ', registrationError);
//                 });
//         });
//     }
//  3 package.json中配置
//     "eslintConfig": {
//             "env": {
//             "browser": true
//         }
//     },
// note
//  仅支持本地和https
//  断网后刷新也可以访问页面（缓存）
//  服务器中才可以看到效果 npx serve -s build


const {
    partial,
    lint,
    tools,
    resource,
    style,
    optimize,
    merge
} = require('../component/interface');

const res = merge(
    // 入口
    partial.initEntry('./src/js/pwa.js'),
    // 开发环境
    partial.initMode(),
    // 输出
    partial.initOutput('dist'),
    // 使用插件完成一些功能
    // 顺序不重要
    partial.initPlugins(
        // 清理输出目录
        resource.plugin.initCleanWebpackPlugin(),
        // 处理html文件
        // 不传参默认模板
        // 生产模式如果模板文件img的src属性转base64成字符串会出错
        // 根据提示设置参数
        resource.plugin.initHtmlWebpackPlugin('public/base.html', false),
        // 单独打包css文件，需要配合对应的loader使用
        style.plugins.initMiniCssExtractPlugin(),
        // 压缩打包后的CSS文件
        style.plugins.initOptimizeCssAssetsWebpackPlugin(),
        // 生成service-worker使用的文件
        optimize.plugin.initGenerateSW()
    ),
    // 文件加载优先寻找顺序
    lint.extensions.js,
    // 生成{module:rules}对象
    partial.initModule(
        // 处理js
        tools.initRule(
            lint.test.js,
            lint.loader.initBabel(),
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
            style.loader.initMiniCssLoader(),
            style.loader.css,
            style.loader.initPostcss()
        ),
        // 处理less
        tools.initRule(
            style.test.less,
            style.loader.initMiniCssLoader(),
            style.loader.css,
            style.loader.initPostcss(),
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