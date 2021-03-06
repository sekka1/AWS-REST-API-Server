/**
 *  Exposes AWS EC2 functionality
 *
 *  AWS EC2 Doc: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/frames.html
 *  http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/EC2.html
 */

var aws = require('./awsConfig.js');
var ec2 = aws.getEC2();

exports.ec2API = function(apiName, params, callback){

    console.log(apiName);
    console.log(params);

    ec2[apiName](params, function(err, data) {
        if (err){
            //console.log(err, err.stack); // an error occurred
            callback(err, null);
        }else{
            //console.log(data);           // successful response
            callback(null, data);
        }
    });
};