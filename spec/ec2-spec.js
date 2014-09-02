var ec2 = require('../lib/AWS/ec2.js');

describe("EC2 functionality", function(){


    it("query the describeInstances interface and return a positive result", function(done){

        var params = JSON.parse('{"DryRun":false,"Filters":[{"Name":"tag:role","Values":["datastax-cassandra"]}]}');

        ec2.describeInstances(params, function(err, data){
            expect(JSON.stringify(data)).toContain('Reservations');
            done();
        });
    });

    it("query the describeInstances interface and return a negative result", function(done){

        var params = JSON.parse('{"DryRun":false,"Filters":[{"Name":"foo___bar","Values":["datastax-cassandra"]}]}');

        ec2.describeInstances(params, function(err, data){
            expect(JSON.stringify(err)).toContain('InvalidParameterValue');
            done();
        });
    });

});