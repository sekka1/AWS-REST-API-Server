var ec2 = require('../lib/AWS/ec2.js');

describe("EC2 functionality", function(){

    it("query the describeInstances interface and return a positive result", function(done){

        var apiName = 'describeInstances';
        var params = JSON.parse('{"DryRun":false,"Filters":[{"Name":"tag:role","Values":["datastax-cassandra"]}]}');

        ec2.ec2API(apiName, params, function(err, data){
            expect(JSON.stringify(data)).toContain('Reservations');
            done();
        });
    });

    it("query the describeInstances interface and return a negative result", function(done){

        var apiName = 'describeInstances';
        var params = JSON.parse('{"DryRun":false,"Filters":[{"Name":"foo___bar","Values":["datastax-cassandra"]}]}');

        ec2.ec2API(apiName, params, function(err, data){
            expect(JSON.stringify(err)).toContain('InvalidParameterValue');
            done();
        });
    });

    // Live test or it will fail
    /*
    it("should retrieve the password for a windows instance", function(done){

        var instance_id = 'i-90949d7a';

        var params = {
            InstanceId: instance_id,
            DryRun: false
        };

        ec2.getPasswordData(params, function(err, data){

            console.log(err);
            console.log(data);
        });

    });
    */

    it("should call any arbitrary functions from the ec2 object", function(done){

        var apiName = 'describeInstances';
        var params = JSON.parse('{"DryRun":false,"Filters":[{"Name":"tag:role","Values":["datastax-cassandra"]}]}');

        ec2.ec2API(apiName, params, function(err, data){
            console.log(err);
            console.log(data);
            //expect(JSON.stringify(data)).toContain('Reservations');
            done();
        });

    });

});