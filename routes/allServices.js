/**
 * Routes for all endpoint
 *
 */
var allServices = require('../lib/AWS/allServices.js');

/**
 * Calling the generic ec2 object using reflection to call the function
 *
 * @param req
 * @param res
 */
exports.allAPI = function(req, res){

    var serviceName = req.params.serviceName;
    var apiName = req.params.apiName;
    var params = req.body;

    console.log(serviceName+'/'+apiName);
    console.log(req.body);

    allServices.allAPI(serviceName, apiName, params, function(err, data){
        if(err){
            console.log(err);
            res.json(400, err);
        }else{
            console.log(data);
            res.json(200, data);
        }
    });
};