const {
    partial,
    lint,
    tools,
    resource,
    style,
    merge
} = require('./component/interface');

const res = merge(
    // 入口
    partial.initEntry('./src/js/base.js'),
    // 开发环境
    partial.dev,
    // 输出
    partial.initOutput('dist'),
    // 使用插件完成一些功能
    // 顺序不重要
    partial.initPlugins(
        // 清理输出目录
        resource.plugin.initCleanWebpackPlugin(),
        // 处理html文件（不传参默认模板）
        resource.plugin.initHtmlWebpackPlugin('public/base.html', false),
        // 单独打包css文件，需要配合对应的loader使用
        style.plugins.initMiniCssExtractPlugin()
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