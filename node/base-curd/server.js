const http = require('http');
const route = require('./route');
const srv = http.createServer();
srv.listen(8000, function () {
    console.log('listening 127.0.0.1:8000');
});

srv.on('request', function (req, res) {
    const url = req.url.toLowerCase();
    route(url, req, res);
});

// create table art (
//     id int primary key auto_increment,
//     author varchar(16),
//     title varchar(128),
//     content text,
//     time timestamp
// );

// insert into art (author, title, content) values ('baby', 'hell, boy', 'today is sunny data');