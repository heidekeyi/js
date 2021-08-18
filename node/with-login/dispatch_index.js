const model = require('./model');
const index = function (req, res) {
    model.fetchAll().then(function (data) {
        res.render('./index.html', {art_data: data});
    }).catch(function (err) {
        console.log(err);
        res.end('');
    });
};

module.exports = index;