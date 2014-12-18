/**
 * Routes for EC2 endpoint
 *
 */
var ec2 = require('../lib/AWS/ec2.js');

/**
 * Calling the generic ec2 object using reflection to call the function
 *
 * @param req
 * @param res
 */
exports.ec2API = function(req, res){

    var apiName = req.params.apiName;
    var params = req.body;

    console.log('ec2: '+apiName);
    console.log(req.body);

    ec2.ec2API(apiName, params, function(err, data){
        if(err){
            console.log(err);
            res.json(400, err);
        }else{
            console.log(data);
            res.json(200, data);
        }
    });
};