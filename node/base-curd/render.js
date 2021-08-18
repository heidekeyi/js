const template = require('art-template');
template.defaults.root = './';
const db = require('./db');

function index(callback) {
    db.fetchAllArt(function (art_data) {
        art_data = art_data || [];
        callback(template('./index.html', {art_data}));
    });
}

const art = {
    get: function (id, callback) {

    },
    add: function (data, callback) {
        db.artAdd(data, callback);
    }
};

module.exports = {
    index,
    art
};