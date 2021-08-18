const dispatch_index = require('./dispatch_index');
const dispatch_art = require('./dispatch_art');
const route = function (req, res) {
    const url = req.url;
    if (url === '/') {
        dispatch_index(req, res);
    } else if (url.startsWith('/art')) {
        dispatch_art(req, res);
    } else {
        res.end('');
    }
};

module.exports = route;