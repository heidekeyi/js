// Dll
// step
//  1 打包第三方库（参看module配置）
//  2 配置plugin
// note
//  第三方库可能非常多
//  整体打包体积会非常大
//  分割打包第三方库，可以优化性能
//  根据需要分割，太多了也不好，推荐不超5个


const {
    partial,
    resource,
    optimize,
    merge
} = require('../component/interface');

const res = merge(
    partial.initEntry('./src/js/optimize.js'),
    partial.initOutput('dist'),
    partial.initMode(),
    partial.initPlugins(
        resource.plugin.initCleanWebpackPlugin(),
        resource.plugin.initHtmlWebpackPlugin(),
        // 忽略映射文件中使用的第三方库
        ...optimize.plugin.initDllReferencePlugin(['jquery', 'lodash'], true),
        // 拷贝映射文件中使用的第三方库
        optimize.plugin.initAddAssetHtmlPlugin()
    )
);
module.exports = res;