const http = require('http');
const srv = http.createServer();
const route = require('./route');
srv.listen(8000, function () {
    console.log('listening 127.0.0.1:8000');
});

srv.on('request', route);