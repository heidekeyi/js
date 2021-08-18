// 使用插件打包第三方库
// 生成对应的映射文件（多份）
const {
    partial,
    resource,
    optimize,
    merge
} = require('../component/interface');

const res = merge(
    partial.initEntry({
        lodash : ['lodash'],
        jquery : ['jquery'],
    }),
    partial.initOutput('dll', '[name].dll.js'),
    partial.initMode(),
    partial.initPlugins(
        resource.plugin.initCleanWebpackPlugin(),
        // 生成打包文件的映射文件
        optimize.plugin.initDllPlugin()
    )
);
module.exports = res;