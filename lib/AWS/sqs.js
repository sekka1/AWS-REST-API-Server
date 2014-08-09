/**
 *  Exposes AWS SQS functionality
 *
 *  AWS SQS Doc: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/frames.html
 */

var aws = require('./awsConfig.js');
var sqs = aws.getSQS();

/**
 * Retrieves one or more messages from the queue
 *
 * @param params
 * @param callback
 */
exports.receiveMessage = function(params, callback){

    sqs.receiveMessage(params, function(err, data) {
        if (err){
            console.log(err, err.stack); // an error occurred
            callback(err, null);
        }else{
            //console.log(data);           // successful response
            callback(null, data);
        }
    });
};

/**
 * Delivers a message to the specified queue
 * 
 * @param params
 * @param callback
 */
exports.sendMessage = function(params, callback){

    sqs.sendMessage(params, function(err, data) {
        if (err){
            console.log(err, err.stack); // an error occurred
            callback(err, null);
        }else{
            //console.log(data);           // successful response
            callback(null, data);
        }
    });
};