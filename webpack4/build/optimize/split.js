// 文件分割
// ways
//  1 多入口文件
//  2 Chunk（设置optimization）
//  3 js使用代码方式分割
//    import (/*webpackChunkName: 'name'*/xxx).then().catch()
// note
//  多入口打包输出多文件，一同在template中引入
//  设置optimization后（所有方式都有效）
//   公共的模块：第三方模块，文件体积比较大的
//   公共的模块会单独打包成一个chunk
//   例子：
//    a. lodash + jquery
//    b. lodash 或者 jquery
//    文件1使用a方式，文件2也使用a方式
//     打包后仅1文件（公共文件是2个）
//    文件1使用a方式，文件2使用b方式
//     打包后仅有2文件（公共文件是1个）
//  import 方式可以使用时才加载（可按需加载）
//     window.addEventListener('click', function () {
//         import (
//             './optimize'
//             /*webpackChunkName: 'chuck/optimize'*/
//             )
//             .then(() => {
//                 console.log('按需加载--OK');
//             })
//             .catch(() => {
//                 console.log('按需加载--加载失败');
//             });
//         import(
//             /*webpackChunkName: 'chuck/test'*/
//             /*webpackPrefetch: true*/
//             './test'
//             )
//             .then(() => {
//                 console.log('预加载--OK');
//             })
//             .catch(() => {
//                 console.log('预加载--加载失败');
//             });
//     })


// js正常加载 并行加载，先后顺序
// js懒加载，使用时发请求获取
//  使用import (/*webpackChunkName: 'name'*/xxx).then().catch()方式
// js 预加载 其他优先加载，空闲时加载，兼容性差
//  使用import (/*webpackChunkName: 'name', webpackPrefetch : true*/xxx).then().catch()方式
// 注意：测试时预加载在实际使用时候又发了请求


const {
    partial,
    resource,
    optimize,
    merge
} = require('../component/interface');

const conf = {
    multiple : merge(
        partial.initEntry({
            optimize : './src/js/optimize.js',
            test : './src/js/test.js'
        })
    ),
    single : merge(
        partial.initEntry('./src/js/optimize.js'),
    ),
    import : merge(
        partial.initEntry('./src/js/import.js'),
    )
};

const res = merge(
    conf.import,
    partial.initOutput('dist'),
    // 开启分割打包第三方模块
    optimize.split.initSplitChunks(),
    partial.prod,
    partial.initPlugins(
        resource.plugin.initCleanWebpackPlugin(),
        resource.plugin.initHtmlWebpackPlugin(),
    )
);
module.exports = res;