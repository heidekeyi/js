const conn = require('./conn');

const exec = function (sql) {
    return new Promise(function (resolve, reject) {
        conn.query(sql, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

const fetchAll = function () {
    const sql = "select id, author, title, date_format(time, '%Y-%m-%d %h:%i:%s') as time from art";
    return exec(sql);
};

const artGet = function (id) {
    const sql = `select id, author, title, date_format(time, '%Y-%m-%d %h:%i:%s') as time, content from art where id = '${id}'`;
    return exec(sql);
};

const artPut = function (data) {
    let where = `where id = '${data.id}'`;
    const sets = Object.keys(data).map(function (key) {
        return `${key}='${data[key]}'`;
    });
    const sql = `update art set ${sets.join(',')} ${where}`;
    return exec(sql);
};


const artDelete = function (id) {
    const sql = `delete from art where id = '${id}'`;
    return exec(sql);
};
const artPost = function (data) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const field_str = keys.join(',');
    const values_str = `'${values.join("','")}'`;
    const sql = `insert into art (${field_str}) values (${values_str})`;
    return exec(sql);
};

module.exports = {
    fetchAll,
    artGet,
    artPut,
    artDelete,
    artPost
};