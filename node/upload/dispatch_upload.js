// const path = require('path');

// this.maxFields = opts.maxFields || 1000;
// this.maxFieldsSize = opts.maxFieldsSize || 20 * 1024 * 1024;
// this.maxFileSize = opts.maxFileSize || 200 * 1024 * 1024;
// this.keepExtensions = opts.keepExtensions || false;
// this.uploadDir = opts.uploadDir || (os.tmpdir && os.tmpdir()) || os.tmpDir();
// this.encoding = opts.encoding || 'utf-8';
// this.headers = null;
// this.type = null;
// this.hash = opts.hash || false;
// this.multiples = opts.multiples || false;
// 常用----------------
// form.uploadDir = "./garbage/";
// form.keepExtensions = true;
// form.multiples = true;
const formidable = require('formidable');
const fs = require('fs');

class UploadContainFiles {
    constructor(req, path = './public/img/', temp = './temp/') {
        const form = new formidable.IncomingForm();
        form.uploadDir = temp;
        form.keepExtensions = true;
        form.multiples = true;
        this.temp = temp;
        this.form = form;
        this.req = req;
        this.path = path;
        this.fields = {};
        this.files = {};
        this._createDir();
    }

    receive() {
        return new Promise((resolve, reject) => {
            this.form.parse(this.req, (err, fields, files) => {
                if (err) {
                    reject(err);
                } else {
                    this.fields = fields;
                    this.files = files;
                    this._moveFiles().then(() => {
                        resolve({fields, files: this.uploadsFiles});
                    }).catch((err) => {
                        reject(err);
                    });
                }
            });
        });
    }

    _moveFiles() {
        const files = this.files;
        this.uploadsFiles = {};
        const promises = Object.keys(files).map((key) => {
            const arr = [];
            this.uploadsFiles[key] = arr;
            return new Promise((resolve, reject) => {
                const data = files[key];
                const tmp = data instanceof Array ? data : [data];
                const promises = tmp.map((it) => {
                    return new Promise((resolve, reject) => {
                        if (it.size) {
                            const pathname = this.path + it.path.replace(/(.*[/\\])/, '');
                            arr.push(pathname);
                            fs.rename(it.path, pathname, (err) => err ? reject(err) : resolve());
                        } else {
                            fs.unlink(it.path, (err) => err ? resolve(err) : resolve());
                        }
                    });
                });
                return Promise.all(promises).then(() => {
                    resolve();
                }).catch((err) => {
                    reject(err);
                });
            });

        });
        return Promise.all(promises);
    }

    _createDir() {
        fs.mkdirSync(this.path, {
            recursive: true,
            mode: 0o755
        });
        fs.mkdirSync(this.temp, {
            recursive: true,
            mode: 0o755
        });
    }
}

module.exports = UploadContainFiles;