/**
 *  Exposes AWS Route53 functionality
 *
 *  AWS Route53 Doc: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Route53.html
 *  http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/EC2.html
 */

var aws = require('./awsConfig.js');
var route53 = aws.getRoute53();

/**
 * http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Route53.html#changeResourceRecordSets-property
 *
 * @param params
 * @param callback
 */
exports.changeResourceRecordSets = function(params, callback){

    route53.changeResourceRecordSets(params, function(err, data) {
        if (err){
            //console.log(err, err.stack); // an error occurred
            callback(err, null);
        }else{
            //console.log(data);           // successful response
            callback(null, data);
        }
    });
};