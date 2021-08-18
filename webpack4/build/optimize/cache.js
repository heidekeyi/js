// 缓存
// ways
//  1 hash 项目唯一值
//  2 chunkhash 入口chunk决定，入口文件引入文件的都一样
//  3 contenthash 文件内容决定
// note
//  不清理目录的情况下才有效果
//  资源缓存 contenthash
//  一般情况 hash
//  线上Bug，会自动使用文件名带hash的新文件


const {
    partial,
    lint,
    tools,
    resource,
    style,
    merge
} = require('../component/interface');

const res = merge(
    // 入口
    partial.initEntry('./src/js/base.js'),
    // 开发环境
    partial.initMode(),
    // 输出
    partial.initOutput('dist'),
    // 使用插件完成一些功能
    // 顺序不重要
    partial.initPlugins(
        resource.plugin.initHtmlWebpackPlugin('public/base.html', false),
        // 单独打包css文件，需要配合对应的loader使用
        style.plugins.initMiniCssExtractPlugin('assets/css/bundle.css', true),
        // 压缩打包后的CSS文件
        style.plugins.initOptimizeCssAssetsWebpackPlugin()
    ),
    // 文件加载优先寻找顺序
    lint.extensions.js,
    // 生成{module:rules}对象
    partial.initModule(
        // 处理js
        tools.initRule(
            lint.test.js,
            lint.loader.initBabel(true),
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
            resource.loader.initImg('assets/img', true)
        ),
        // 处理字体
        tools.initRule(
            resource.test.font,
            resource.loader.initFont('assets/font', true)
        )
    )
);
module.exports = res;