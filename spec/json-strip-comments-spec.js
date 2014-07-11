var jsonStripComments = require('../lib/strip-json-comments.js');

describe("JSON Strip Comment", function(){


    it("Should remove comments from a json string", function(done){

        var json_with_comments = '/** some comment \
        /* more comment\
        */\
        "LoadBalancerWebAPI" : { \
        "Type" : "AWS::ElasticLoadBalancing::LoadBalancer", \
            "Properties" : {}\
        ';

        jsonStripComments.strip(json_with_comments, function(err, result){
            expect(err).toBe(null);
            expect(result).not.toContain("more comment");
            done();
        });
    });
});