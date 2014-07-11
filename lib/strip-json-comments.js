var stripJsonComments = require('strip-json-comments');

exports.strip = function(json, callback){
    callback(null, stripJsonComments(json));
};