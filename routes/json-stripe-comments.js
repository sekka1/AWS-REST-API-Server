var jsonStrip = require('../lib/strip-json-comments.js');

exports.strip = function(req, res){

    var json = req.body.json;

    jsonStrip.strip(json, function(err, result){
        if(err){
            console.log('error...');
            res.json(500, err);
        }else{
            res.json(200, result);
        }
    });
};