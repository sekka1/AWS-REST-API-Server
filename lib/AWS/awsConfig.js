/**
 * Sets up the AWS object
 *
 */
var config = require('../../config.js');
var AWS = require('aws-sdk');

var aws_accessKeyId = process.env.aws_accessKeyId || config.aws_accessKeyId;
var aws_secretAccessKey = process.env.aws_secretAccessKey || config.aws_secretAccessKey;
var aws_region = process.env.aws_region || config.aws_region;
var aws_DynamoDB_version = process.env.aws_DynamoDB_version || config.aws_DynamoDB_version;
var aws_CloudFormation_version = process.env.aws_CloudFormation_version || config.aws_CloudFormation_version;

// Load aws credentials, settings, versions
AWS.config.update({accessKeyId: aws_accessKeyId, secretAccessKey: aws_secretAccessKey, region: aws_region});
AWS.config.apiVersions = {
    dynamodb: aws_DynamoDB_version,
    cloudformation: aws_CloudFormation_version,
    sqs: aws_SQS_version
};

var dynamodb = new AWS.DynamoDB();
var cloudformation = new AWS.CloudFormation();
var sqs = new new AWS.SQS();

/**
 * Returns the dynamodb object
 *
 * @returns {AWS.DynamoDB}
 */
exports.getDynamodb = function(){
    return dynamodb;
};

/**
 * Returns the cloudformation object
 *
 * @returns {AWS.CloudFormation}
 */
exports.getCloudFormation = function(){
    return cloudformation;
};

/**
 * Returns the SQS object
 *
 * @returns {AWS.SQS}
 */
exports.getSQS = function(){
    return sqs;
};
