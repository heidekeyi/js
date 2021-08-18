const lint = require('./lint');
const style = require('./style');
const partial = require('./partial');
const resource = require('./resource');
const tools = require('./tools');
const optimize = require('./optimize');
const merge = require('webpack-merge');
module.exports = {
    lint,
    style,
    partial,
    resource,
    tools,
    optimize,
    merge
}