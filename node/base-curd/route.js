const render = require('./render');
const querystring = require('querystring');
const url = require('url');
const route = function (u, req, res) {
    if (u === '/') {
        render.index(function (data) {
            res.end(data);
        });
    } else if (u.startsWith('/art')) {
        const method = req.method.toLowerCase();
        const art = render.art;
        if (method === 'post') {
            const data = {};
            let s = '';
            req.on('data', function (chunk) {
                s += chunk;
            });
            req.on('end', function () {
                Object.assign(data, querystring.parse(s));
                art.add(data, function () {
                    res.writeHead(
                        302,
                        {
                            location: './'
                        }
                    );
                    res.end('');
                });
            });
        } else {
            const method = url.parse(req.url, true).query.method;
            console.log(method)
        }
    } else {
        res.end('');
    }
};

module.exports = route;