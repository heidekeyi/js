const express = require('express');
const app = express();

const template = require('express-art-template');
app.engine('html', template);
app.use(express.static('public'));
const cs = require('cookie-session');
app.use(cs({
    keys: ['key1', 'key2']//用于加密
}));
const router = require('./router');
app.use(router);
app.listen(8000, function () {
    console.log('listening 127.0.0.1:8000');
});