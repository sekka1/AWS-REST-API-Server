AWS REST API Server
===================
[![Build Status](https://drone.io/github.com/sekka1/AWS-REST-API-Server/status.png)](https://drone.io/github.com/sekka1/AWS-REST-API-Server/latest)

This is basically a wrapper around the AWS javascript SDK that exposes out a REST interface for its functionality.

AWS Credentials Setup
=====================
You will need to get keys to your AWS account for the API to make requests with it.  These key strings are placed into a file called config.js.  There is a config.js.sample that you can copy and use.

Running the REST API
====================

    npm install
    node app.js
    
Using the REST API
==================

## CloudFormation

### createStack

AWS documentation on the parameters: [http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudFormation.html#createStack-property](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudFormation.html#createStack-property)

    curl -X PUT localhost:8080/cloudformation \
    -d 'stack_config={"StackName":"testAutomationStack","OnFailure":"ROLLBACK"}' \
    -d 'cloudformation_template=<FULL_CLOUDFORMATION_JSON_TEMPLATE>' 

### updateStack

AWS documentation on the parameters: [http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudFormation.html#updateStack-property](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudFormation.html#updateStack-property)

    curl -X POST localhost:8080/cloudformation \
    -d 'stack_config={"StackName":"testAutomationStack"}' \
    -d 'cloudformation_template=<FULL_CLOUDFORMATION_JSON_TEMPLATE>' 

### deleteStack

AWS documentation on the parameters: [http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudFormation.html#deleteStack-property](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudFormation.html#deleteStack-property)

    curl -X DELETE localhost:8080/cloudformation/<STACK_NAME>
    
### validateTemplate

AWS documentation on the parameters: [http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudFormation.html#validateTemplate-property](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudFormation.html#validateTemplate-property)

    curl -X POST localhost:8080/cloudformation/validate \
    -d 'cloudformation_template=<FULL_CLOUDFORMATION_JSON_TEMPLATE>'

## JSON Strip Comments
Strips out the comments in a JSON string.  This is useful for CloudFormation templates where you comment inside the JSON template.

    curl -X POST localhost:8080/json-strip-comments \
    -d 'json={/**comment here*/ "json":"here"}'

## SQS

### receiveMessage

AWS documentation on the parameters: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SQS.html#receiveMessage-property

The params has to be URL encoded.

    curl localhost:8080/sqs/<URL encoded params per the doc>

### sendMessage

AWS documentation on the parameters: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SQS.html#sendMessage-property

    curl -v -X POST localhost:8080/sqs/sendMessage \
    -d 'params=<SQS sendMessage PARAMS>'

# EC2

### describeInstances
Search throughout your AWS account for information about various resources.

AWS documentation on the parameters: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/EC2.html#describeInstances-property

    curl -v -X POST localhost:8080/ec2/describeInstances \
    -H 'Content-Type: application/json' \
    -d 'params=<describeInstances params>'

Docker Container
=================
There is a Dockerfile at the root of this project to setup a ready to go container serving out this functionality.  

This project is also being built on docker automatically on ever commit.  You can pull it from there also.  [https://registry.hub.docker.com/u/garland/aws-rest-api-server/](https://registry.hub.docker.com/u/garland/aws-rest-api-server/)

## Running the container
You will need to pass in the config.js parameters to the containers via environmental variables.  Only the accessKeyId and secretAccessKey are required.

    docker run \
    -p 80:8080 \
    --env accessKeyId=YOUR_KEY_HERE \
    --env secretAccessKey=YOUR_SECRET_KEY_HERE \
    --env aws_region=us-west-2 \
    garland/aws-rest-api-server
    
List of valid AWS regions: http://docs.aws.amazon.com/general/latest/gr/rande.html