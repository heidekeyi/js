// const querystring = require('querystring');
const fs = require('fs');
const url = require('url');
const model = require('./model');
const UploadContainFiles = require('./form_data');
const jump = require('./jump');
const method = {
    getQueryId(req) {
        return url.parse(req.url, true).query.id;
    },
    refresh : jump.refresh,
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
            new UploadContainFiles(req).receive().then(function (data) {
                const fields = data.fields;
                fields.picture = data.files.picture.join('');
                return model.artPost(fields);
            }).then(function ({affectedRows}) {
                if (affectedRows === 1) {
                    method.refresh(res, '添加成功');
                }
            }).catch(function (err) {
                console.log(err);
            });
        },
        update(req, res) {
            new UploadContainFiles(req).receive().then(function (data) {
                const fields = data.fields;
                const picture = data.files.picture.join('');
                return new Promise(function (resolve, reject) {
                    if (picture && fields.picture) {
                        fs.unlink(fields.picture, function (err) {
                            fields.picture = picture;
                            err ? reject(err) : resolve(fields);
                        });
                    } else {
                        fields.picture = picture;
                        resolve(fields);
                    }
                });
            }).then(function (data) {
                return model.artPut(data);
            }).then(function ({affectedRows}) {
                if (affectedRows === 1) {
                    method.refresh(res, '更新成功');
                }
            }).catch(function (err) {
                console.log(err);
            });
        }
    },
    get: {
        add(req, res) {
            res.render('./art_edit.html', {
                art: {
                    title: '',
                    content: '',
                    author: '',
                    picture: ''
                },
                action: 'insert',
                title: '添加文章'
            });
        },
        modify(req, res) {
            model.artGet(method.getQueryId(req)).then(function (data) {
                res.render('./art_edit.html', {
                    art: data[0],
                    action: 'update',
                    title: '修改文章'
                });
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
                res.render('./art_index.html', {
                    art: data[0]
                });
            }).catch(function (err) {
                console.log(err);
            });
        }
    }
};

const art = function (req, res) {
    const query = url.parse(req.url, true).query;
    method[req.method.toLowerCase()][query.a](req, res);
};

module.exports = art;