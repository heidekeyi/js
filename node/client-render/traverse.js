const http = require('http');
const fs = require('fs');
const moment = require('moment');
const srv = http.createServer();
srv.listen(8000, '127.0.0.1', function () {
    console.log('listening: ', '127.0.0.1:8000');
});

srv.on('request', function (req, res) {
    const url = req.url;
    if (url === '/') {
        fs.readFile('t.htm', function (err, data) {
            res.end(data);
        });
    } else if (url === '/list') {
        fs.readdir('./', function (err, arr) {
            if (err) {
                res.end = 'err';
            } else {
                const data = [];
                let i = 1;
                arr.forEach(it => {
                    const stats = fs.statSync(it);
                    const name = stats.isFile() ? 'unknown' : 'folder';
                    data.push({
                        name: it,
                        time: moment(stats.mtime).format('YYYY-MM-DD hh:mm:ss'),
                        size: stats.size,
                        gif : `./test/${name}.gif`
                    });
                });
                res.setHeader('content-type', 'text/plain;charset=utf8');
                res.end(JSON.stringify(data));
            }
        });

    } else {
        const path = '.' + url;
        fs.readFile(path, function (err, data = '') {
            res.end(data);
        });
    }
});