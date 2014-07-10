var cloudformation = require('../lib/AWS/cloudformation.js');

exports.createStack = function(req, res){

    console.log('cf submit');

    //console.log(req.body);

    var stack_config = JSON.parse(req.body.stack_config);
    var cloudformation_template = JSON.parse(req.body.cloudformation_template);

    console.log(stack_config.StackName);
    console.log(cloudformation_template.AWSTemplateFormatVersion);

    cloudformation.createStack(stack_config, cloudformation_template, function(err, result){
        if(err){
            console.log(err);
            res.json(400, err);
        }else{
            console.log(result);
            res.json(200, result);
        }
    });
};

exports.updateStack = function(req, res){

    console.log('cf update');

    //console.log(req.body);

    var stack_config = JSON.parse(req.body.stack_config);
    var cloudformation_template = JSON.parse(req.body.cloudformation_template);

    console.log(stack_config.StackName);
    console.log(cloudformation_template.AWSTemplateFormatVersion);

    cloudformation.updateStack(stack_config, cloudformation_template, function(err, result){
        if(err){
            console.log(err);
            res.json(400, err);
        }else{
            console.log(result);
            res.json(200, result);
        }
    });
};

exports.deleteStack = function(req, res){

    var stackName = req.params.stackName;

    console.log('Stack to delete: '+stackName);

    cloudformation.deleteStack(stackName, function(err, result){
        if(err){
            console.log(err);
            res.json(400, err);
        }else{
            console.log(result);
            res.json(200, result);
        }
    });
};