AWS REST API Server
===================
[![Build Status](https://drone.io/github.com/sekka1/AWS-REST-API-Server/status.png)](https://drone.io/github.com/sekka1/AWS-REST-API-Server/latest)

This is basically a wrapper around the AWS javascript SDK that exposes out a REST interface for its functionality.

It is like the AWS CLI tool but as a REST API.

AWS Credentials Setup
=====================
You will need to get keys to your AWS account for the API to make requests with it.  These key strings are placed into a file called config.js.  There is a config.js.sample that you can copy and use.

Running the REST API
====================

    npm install
    node app.js
    
Using the REST API
==================
You can use any of the AWS service described here: [http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Service.html](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Service.html)

The endpoint name is the class name (case sensitive)



## CloudFormation

### createStack

AWS documentation on the parameters: [http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudFormation.html#createStack-property](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudFormation.html#createStack-property)

    curl -X PUT localhost:8080/CloudFormation \
    -d 'stack_config={"StackName":"testAutomationStack","OnFailure":"ROLLBACK"}' \
    -d 'cloudformation_template=<FULL_CLOUDFORMATION_JSON_TEMPLATE>' 

### updateStack

AWS documentation on the parameters: [http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudFormation.html#updateStack-property](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudFormation.html#updateStack-property)

    curl -X POST localhost:8080/CloudFormation \
    -d 'stack_config={"StackName":"testAutomationStack"}' \
    -d 'cloudformation_template=<FULL_CLOUDFORMATION_JSON_TEMPLATE>' 

### deleteStack

AWS documentation on the parameters: [http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudFormation.html#deleteStack-property](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudFormation.html#deleteStack-property)

    curl -X DELETE localhost:8080/CloudFormation/<STACK_NAME>

### describeStacks    

AWS documentation on the parameters: [http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudFormation.html#describeStacks-property](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudFormation.html#describeStacks-property)

    curl -X GET localhost:8080/CloudFormation/describeStacks/<STACK_NAME>    
    
### validateTemplate

AWS documentation on the parameters: [http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudFormation.html#validateTemplate-property](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudFormation.html#validateTemplate-property)

    curl -X POST localhost:8080/CloudFormation/validateTemplate \
    -d 'cloudformation_template=<FULL_CLOUDFORMATION_JSON_TEMPLATE>'

## JSON Strip Comments
Strips out the comments in a JSON string.  This is useful for CloudFormation templates where you comment inside the JSON template.

    curl -X POST localhost:8080/json-strip-comments \
    -d 'json={/**comment here*/ "json":"here"}'

## SQS

### receiveMessage

AWS documentation on the parameters: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SQS.html#receiveMessage-property

The params has to be URL encoded.

    curl localhost:8080/SQS/<URL encoded params per the doc>

### sendMessage

AWS documentation on the parameters: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SQS.html#sendMessage-property

    curl -v -X POST localhost:8080/SQS/sendMessage \
    -d 'params=<SQS sendMessage PARAMS>'

# EC2
Any EC2 endpoint listed here can be used: [http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/EC2.html](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/EC2.html)

The generic syntax is:

     curl -v -X POST localhost:8080/EC2/<METHOD_NAME> \
     -H 'Content-Type: application/json' \
     -d '<describeInstances params>'

## Here are some example usage:

### describeInstances
Search throughout your AWS account for information about various resources.

AWS documentation on the parameters: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/EC2.html#describeInstances-property

    curl -v -X POST localhost:8080/EC2/describeInstances \
    -H 'Content-Type: application/json' \
    -d '<describeInstances params>'
    
Example params

    {
      "Filters": [
        {
          "Name": "tag:myTagKey",
          "Values": [
            "my tag value here"
          ]
        },
        {
          "Name": "tag:moreTagKey",
          "Values": [
            "more tag values here"
          ]
        },
        {
          "Name": "instance-state-name",
          "Values": [
            "running"
          ]
        }
      ]
    }
    
    
### createTags
Adds or overwrites one or more tags for the specified EC2 resource or resources.

AWS documentation on the parameters: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/EC2.html#createTags-property

    curl -v -X POST localhost:8080/EC2/createTags \
    -H 'Content-Type: application/json' \
    -d '<createTags params>'
    
Example Params

    {
      "Resources": [
        "i-1d4402f6"
      ],
      "Tags": [
        {
          "Key": "test",
          "Value": "two"
        }
      ]
    }

### getPasswordData
Retrieves the encrypted administrator password for an instance running Windows.

AWS documentation on the parameters: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/EC2.html#getPasswordData-property

    curl -v -X POST localhost:8080/EC2/getPasswordData \
    -H 'Content-Type: application/json' \
    -d '<createTags params>'

Example Params

    {
      "InstanceId": <instance_id>
    }

Example Return:

    {
      "InstanceId": "i-48599d7a",
      "Timestamp": "2014-12-11T01:18:27.000Z",
      "PasswordData": "\r\nZoV5gs0......wLrWk1KRJmKNzp6Q==\r\n"
    }

# Route53

### changeResourceRecordSets
Use this action to create or change your authoritative DNS information.

AWS documentation on the parameters: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Route53.html#changeResourceRecordSets-property

    curl -v -X POST localhost:8080/Route53/changeResourceRecordSets \
    -H 'Content-Type: application/json' \
    -d '<createTags params>'
    
Example params

    {
      "ChangeBatch": {
        "Changes": [
          {
            "Action": "CREATE",
            "ResourceRecordSet": {
              "Name": "my.domain.name.com.",
              "Type": "A",
              "TTL": "600",
              "ResourceRecords": [
                {
                  "Value": "10.1.1.100"
                }
              ]
            }
          }
        ],
        "Comment": "created by AWS-REST-API-SERVER"
      },
      "HostedZoneId": "<HOSTED_ZONE_ID>"
    }

Docker Container
=================
There is a Dockerfile at the root of this project to setup a ready to go container serving out this functionality.  

This project is also being built on docker automatically on ever commit.  You can pull it from there also.  [https://registry.hub.docker.com/u/garland/aws-rest-api-server/](https://registry.hub.docker.com/u/garland/aws-rest-api-server/)

## Running the container
You will need to pass in the config.js parameters to the containers via environmental variables.  Only the accessKeyId and secretAccessKey are required.

    docker run \
    -p 80:8080 \
    --env aws_accessKeyId=YOUR_KEY_HERE \
    --env aws_secretAccessKey=YOUR_SECRET_KEY_HERE \
    --env aws_region=us-west-2 \
    --env aws_DynamoDB_version=2012-08-10 \
    --env aws_CloudFormation_version=2010-05-15 \
    --env aws_SQS_version=2012-11-05 \
    --env aws_EC2_version=2014-06-15 \
    --env aws_route53_version=2013-04-01 \
    -d garland/aws-rest-api-server
    
List of valid AWS regions: http://docs.aws.amazon.com/general/latest/gr/rande.html
