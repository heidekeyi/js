// CDN
// step
//  1 配置externals
//  2 html中增加CDN，手动添加script标签
// note
//  文件体积小，CDN加载速度快
//  CDN站点：bootCDN

const {
    tools,
    partial,
    resource,
    merge
} = require('../component/interface');

const res = merge(
    partial.initEntry('./src/js/optimize.js'),
    partial.initOutput('dist'),
    partial.prod,
    partial.initCDN(
        '--',
        'jquery--jQuery',
        '_--lodash'
    ),
    partial.initPlugins(
        resource.plugin.initCleanWebpackPlugin(),
        resource.plugin.initHtmlWebpackPlugin('public/optimize.html'),
    )
);
module.exports = res;