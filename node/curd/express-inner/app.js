const express = require('express');
const dispatch_index = require('./dispatch_index');
const dispatch_art = require('./dispatch_art');
const app = express();

app.get('/', dispatch_index);
app.get(/art.*/i, dispatch_art);
app.post(/art.*/i, dispatch_art);
app.listen(8000, function () {
    console.log('listening 127.0.0.1:8000');
});