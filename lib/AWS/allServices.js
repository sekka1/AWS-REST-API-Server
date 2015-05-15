/**
 *  Exposes all AWS functionality
 *
 *  AWS EC2 Doc: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/frames.html
 *  http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/EC2.html
 */

var aws = require('./awsConfig.js');

exports.allAPI = function(serviceName, apiName, params, callback){

    console.log(serviceName);
    console.log(apiName);
    console.log(params);

    var aServiceObject = aws.getServiceObject(serviceName);

    aServiceObject[apiName](params, function(err, data) {
        if (err){
            //console.log(err, err.stack); // an error occurred
            callback(err, null);
        }else{
            //console.log(data);           // successful response
            callback(null, data);
        }
    });
};