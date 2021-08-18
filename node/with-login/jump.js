const refresh = function (res, msg, url = './', status = 200, sec = 3) {
    res.writeHead(
        status,
        {
            "content-type": 'text/html;charset=utf8',
            "refresh": `${sec},url=${url}`
        });
    res.end(`<h2>${msg}</h2>`);
};

module.exports = {
    refresh
};