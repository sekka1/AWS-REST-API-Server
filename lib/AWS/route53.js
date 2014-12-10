/**
 *  Exposes AWS Route53 functionality
 *
 *  AWS Route53 Doc: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Route53.html
 *  http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/EC2.html
 */

var aws = require('./awsConfig.js');
var route53 = aws.getRoute53();
var async = require('async');

/**
 * http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Route53.html#changeResourceRecordSets-property
 *
 * @param params
 * @param callback
 */
exports.changeResourceRecordSets = function(params, callbackMain){

    // Slowing down submitting this request b/c Amazon AWS starts to throttle
    // how many operations it will do for you.
    async.series({
            one: function(callback){
                setTimeout(function(){

                    route53.changeResourceRecordSets(params, function(err, data) {
                        if (err){
                            //console.log(err, err.stack); // an error occurred

                            callback(err, null);
                        }else{
                            //console.log(data);           // successful response

                            callback(null, data);
                        }
                    });
                }, 2000);
            }
        },
        function(err, results){
            setTimeout(function(){
                if (err){
                    //console.log(err, err.stack); // an error occurred

                    callbackMain(err, null);
                }else{
                    //console.log(data);           // successful response
                    callbackMain(null, results);
                }
            }, 4000);

        });

};