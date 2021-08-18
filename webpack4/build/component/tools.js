const tools = {
    contentHash(filename) {
        const reg = /\.(.*)$/;
        const rep_str = '.[contenthash:8].$1';
        return filename.replace(reg, rep_str);
    },
    initName(is_cache, name = '[name].[ext]') {
        // [ext] 原来的扩展名
        // [name] 原来的名称
        if (is_cache) {
            name = tools.contentHash(name);
        }
        return name;
    },
    initResource(path, is_cache) {
        const name = tools.initName(is_cache);
        return {
            name,
            outputPath: path,
            // 修正资源径引用问题
            publicPath: '/' + path
        };
    },
    initRule(test, ...loaders) {
        return {
            ...test,
            use: loaders
        }
    }
};

module.exports = tools;