/**
 * Sets up the AWS object
 *
 */
var config = require('../../config.js');
var AWS = require('aws-sdk');

// Load aws credentials, settings, versions
AWS.config.update({accessKeyId: config.aws_accessKeyId, secretAccessKey: config.aws_secretAccessKey, region: config.aws_region});
AWS.config.apiVersions = {
    dynamodb: config.aws_DynamoDB_version,
    cloudformation: config.aws_CloudFormation_version
};

var dynamodb = new AWS.DynamoDB();
var cloudformation = new AWS.CloudFormation();

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