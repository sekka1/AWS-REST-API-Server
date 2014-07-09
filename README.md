AWS REST API Server
===================
This is basically a wrapper around the AWS javascript SDK that exposes out a REST interface for its functionality.

Running the REST API
====================

    node app.js
    
Using the REST API
==================

## CloudFormation

### createStack

AWS documentation on the parameters: [http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudFormation.html#createStack-property](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudFormation.html#createStack-property)

    curl -X PUT localhost:8080/cloudformation \
    -d 'stack_config={"StackName":"testAutomationStack","OnFailure":"ROLLBACK"}' \
    -d 'cloudformation_template=<FULL_CLOUDFORMATION_JSON_TEMPLATE>' 

### deleteStack

AWS documentation on the parameters: [http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudFormation.html#deleteStack-property](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudFormation.html#deleteStack-property)

    curl -X DELETE localhost:8080/cloudformation/<STACK_NAME>
