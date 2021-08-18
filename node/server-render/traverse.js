const http = require('http');
const fs = require('fs');
const moment = require('moment');
const template = require('art-template');
template.defaults.root = './';

const srv = http.createServer();
srv.listen(8000, '127.0.0.1', function () {
    console.log('listening: ', '127.0.0.1:8000');
});

srv.on('request', function (req, res) {
    const url = req.url;
    if (url === '/') {
        fs.readdir('./', function (err, arr) {
            res.setHeader('content-type', 'text/html;charset=utf8');
            res.end(template('./t.htm', {
                data: arr.map(it => {
                    const stats = fs.statSync(it);
                    const name = stats.isFile() ? 'text' : 'folder';
                    return {
                        name: it,
                        time: moment(stats.mtime).format('YYYY-MM-DD hh:mm:ss'),
                        size: stats.size,
                        gif: `./test/${name}.gif`
                    };
                })
            }));
        });
    } else {
        const path = '.' + url;
        fs.readFile(path, function (err, data = '') {
            res.end(data);
        });
    }
})
;