const querystring = require('querystring');
const url = require('url');
const model = require('./model');
const template = require('./template');
const method = {
    getQueryId(req) {
        return url.parse(req.url, true).query.id;
    },
    refresh(res, msg, url = './', status = 200, sec = 3) {
        res.writeHead(
            status,
            {
                "content-type": 'text/html;charset=utf8',
                "refresh": `${sec},url=${url}`
            });
        res.end(`<h2>${msg}</h2>`);
    },
    data(req) {
        return new Promise(function (resolve, reject) {
            let data = '';
            req.on('data', function (chunk) {
                data += chunk;
            });
            req.on('end', function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        })
    },
    post: {
        insert(req, res) {
            method.data(req).then(function (data) {
                return model.artPost(querystring.parse(data.toString()));
            }).then(function ({affectedRows}) {
                if (affectedRows === 1) {
                    method.refresh(res, '添加成功');
                }
            }).catch(function (err) {
                console.log(err);
            });
        },
        update(req, res) {
            method.data(req).then(function (data) {
                return model.artPut(querystring.parse(data.toString()));
            }).then(function ({affectedRows}) {
                if (affectedRows === 1) {
                    method.refresh(res, '更新成功');
                }
            }).catch(function (err) {
                console.log(err);
            })
        }
    },
    get: {
        add(req, res) {
            res.end(template('./art_edit.html', {
                art: {
                    title: '',
                    content: '',
                    author: ''
                },
                action: 'insert',
                title: '添加文章'
            }));
        },
        modify(req, res) {
            model.artGet(method.getQueryId(req)).then(function (data) {
                res.end(template('./art_edit.html', {
                    art: data[0],
                    action: 'update',
                    title: '修改文章'
                }));
            }).catch(function (err) {
                console.log(err);
            })
        },
        remove(req, res) {
            model.artDelete(method.getQueryId(req)).then(function ({affectedRows}) {
                if (affectedRows === 1) {
                    method.refresh(res, '删除成功');
                }
            }).catch(function (err) {
                console.log(err);
            })
        },
        index(req, res) {
            model.artGet(method.getQueryId(req)).then(function (data) {
                res.end(template('./art_index.html', {
                    art : data[0]
                }));
            }).catch(function (err) {
                console.log(err);
            });
        }
    }
};

const art = function (req, res) {
    const query = url.parse(req.url, true).query;
    // console.log(query);
    method[req.method.toLowerCase()][query.a](req, res);
};

module.exports = art;