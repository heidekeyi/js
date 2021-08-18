console.log('waiting for click to action');
window.addEventListener('click', function () {
    import (
        './optimize'
        /*webpackChunkName: 'chuck/optimize'*/
        )
        .then(() => {
            console.log('按需加载--OK');
        })
        .catch(() => {
            console.log('按需加载--加载失败');
        });
    import(
        /*webpackChunkName: 'chuck/test'*/
        /*webpackPrefetch: true*/
        './test'
        )
        .then(() => {
            console.log('预加载--OK');
        })
        .catch(() => {
            console.log('预加载--加载失败');
        });
})
