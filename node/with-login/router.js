const dispatch_index = require('./dispatch_index');
const dispatch_art = require('./dispatch_art');
const dispatch_login = require('./dispatch_login');
const express = require('express');
const router = new express.Router();
const jump = require('./jump');
router
    .all("*", function (req, res, next) {
        if (req.url === '/login') {
            next();
        } else if (req.session.data) {
            next();
        } else {
            jump.refresh(res, '请先登录', './login');
        }
    })
    .get('/', dispatch_index)
    .get(/art.*/i, dispatch_art)
    .post(/art.*/i, dispatch_art)
    .get('/login', dispatch_login)
    .post('/login', dispatch_login);

module.exports = router;