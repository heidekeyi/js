const form_data = require('./form_data');
const jump = require('./jump');
const post = function (req, res) {
    new form_data(req).receive()
        .then(function (data) {
            const fields = data.fields;
            if (fields.username === '1' && fields.password ==='1') {
                req.session.data = true;
                jump.refresh(res, '登录成功');
            } else {
                jump.refresh(res, '登录失败请重新登录', './login');
            }
        }).catch(function (err) {
        console.log(err);
    });
};
const get = function (req, res) {
    res.render('login.html', {});
};
const login = function (req, res) {
    const fn = {
        post,
        get
    };
    const method = req.method.toLowerCase();
    fn[method].apply(null, arguments);
};

module.exports = login;