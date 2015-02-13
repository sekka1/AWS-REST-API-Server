/**
 *  Exposes AWS ImportExport functionality
 *
 *  AWS Doc: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/ImportExport.html#createJob-property
 */

var aws = require('./awsConfig.js');
var awsObj = aws.importExport();

exports.api = function(apiName, params, callback){

    console.log(apiName);
    console.log(params);

    awsObj[apiName](params, function(err, data) {
        if (err){
            //console.log(err, err.stack); // an error occurred
            callback(err, null);
        }else{
            //console.log(data);           // successful response
            callback(null, data);
        }
    });
};