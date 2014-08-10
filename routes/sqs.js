/**
 * Routes for SQS endpoint
 *
 */
var sqs = require('../lib/AWS/sqs.js');

/**
 * receiveMessage
 *
 * @param req
 * @param res
 */
exports.receiveMessage = function(req, res){

    console.log('sqs receiveMessage');

    var params = JSON.parse(req.params.sqsParams);

    console.log(params);

    sqs.receiveMessage(params, function(err, result){
        if(err){
            console.log(err);
            res.json(400, err);
        }else{
            console.log(result);
            res.json(200, result);
        }
    });
};

/**
 * sendMessage
 *
 * @param req
 * @param res
 */
exports.sendMessage = function(req, res){

    console.log('sqs sendMessage');

    var params = JSON.parse(req.body.params);

    console.log(params);

    sqs.sendMessage(params, function(err, result){
        if(err){
            console.log(err);
            res.json(400, err);
        }else{
            console.log(result);
            res.json(200, result);
        }
    });
};