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

    curl -X GET localhost:8080/cloudformation \
    -d 'cloudformation_template=<FULL_CLOUDFORMATION_JSON_TEMPLATE>'

## JSON Strip Comments
Strips out the comments in a JSON string.  This is useful for CloudFormation templates where you comment inside the JSON template.

    curl -X POST localhost:8080/json-strip-comments \
    -d 'json={/**comment here*/ "json":"here"}'

Docker Container
=================
There is a Dockerfile at the root of this project to setup a ready to go container serving out this functionality.  

This project is also being built on docker automatically on ever commit.  You can pull it from there also.  [https://registry.hub.docker.com/u/garland/aws-rest-api-server/](https://registry.hub.docker.com/u/garland/aws-rest-api-server/)

## Running the container

    docker run -p 80:8080 garland/aws-rest-api-server
    
