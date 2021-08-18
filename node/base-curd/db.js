const db = require('mysql');
const conn = db.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'db1',
    charset: 'utf8'

});
conn.connect();

function fetchAllArt(callback) {
    const sql = "select id, author, title, date_format(time, '%Y-%m-%d %H:%i:%S') as time from art";
    conn.query(sql, function (err, data) {
        callback(data);
    })
}

function fetchOneArt(id, callback) {

}


function artAdd(data, callback) {
    const sql = `insert into art (author, title, content) values ('${data['author']}', '${data['title']}', '${data['content']}')`;
    conn.query(sql, function (err, data) {
        callback(err);
    });
}



module.exports = {
    fetchAllArt,
    fetchOneArt,
    artAdd
};