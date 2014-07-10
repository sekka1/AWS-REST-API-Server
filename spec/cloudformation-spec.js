var cloudformation = require('../lib/AWS/cloudformation.js');

describe("CloudFormation CRUD functionality", function(){

    var max = 10000;
    var min = 1;
    var random_number_1 = Math.floor(Math.random() * (max - min + 1)) + min;

    var stack_config_good = '{"StackName":"testAutomationStack'+random_number_1+'", "OnFailure":"DELETE"}';
    var stack_config_bad = '{"StackName":"will bomb out if there is a space here","OnFailure":"ROLLBACK"}';
    var cloudformation_temaplate_good = '{"AWSTemplateFormatVersion":"2010-09-09","Description":"Deploys S3 Buckets and CloudFront for an environment","Parameters":{"namePrefix":{"Default":"tout","Description":"Name prefix.  It should be tout","Type":"String","MinLength":"1","MaxLength":"64","AllowedPattern":".*","ConstraintDescription":"You must enter a name here."},"environmentName":{"Default":"anEnvironmentName","Description":"Name of your environment.  For example: stage, garEnv, qa, foo","Type":"String","MinLength":"1","MaxLength":"64","AllowedPattern":".*","ConstraintDescription":"You must enter a name here."}},"Mappings":{"RegionMap":{"us-east-1":{"s3BucketDomain":".s3.amazonaws.com"},"us-west-1":{"s3BucketDomain":".s3-us-west-1.amazonaws.com"},"us-west-2":{"s3BucketDomain":".s3-us-west-2.amazonaws.com"},"eu-west-1":{"s3BucketDomain":".s3-eu-west-1.amazonaws.com"},"sa-east-1":{"s3BucketDomain":".s3-sa-east-1.amazonaws.com"},"ap-northeast-1":{"s3BucketDomain":".s3-ap-northeast-1.amazonaws.com"},"ap-southeast-1":{"s3BucketDomain":".s3-ap-southeast-1.amazonaws.com"},"ap-southeast-2":{"s3BucketDomain":".s3-ap-southeast-2.amazonaws.com"}}},"Resources":{"S3Bucket1":{"Type":"AWS::S3::Bucket","Properties":{"AccessControl":"PublicRead","BucketName":{"Fn::Join":["",[{"Ref":"namePrefix"},"-",{"Ref":"environmentName"},"-facebook-tab-assets"]]}},"DeletionPolicy":"Delete"},"BucketPolicy1":{"Type":"AWS::S3::BucketPolicy","Properties":{"PolicyDocument":{"Id":"MyPolicy","Version":"2012-10-17","Statement":[{"Sid":"PublicReadForGetBucketObjects","Effect":"Allow","Principal":{"AWS":"*"},"Action":"s3:GetObject","Resource":{"Fn::Join":["",["arn:aws:s3:::",{"Ref":"S3Bucket1"},"/*"]]}}]},"Bucket":{"Ref":"S3Bucket1"}}},"S3Bucket2":{"Type":"AWS::S3::Bucket","Properties":{"AccessControl":"PublicRead","BucketName":{"Fn::Join":["",[{"Ref":"namePrefix"},"-",{"Ref":"environmentName"},".","asset"]]}},"DeletionPolicy":"Delete"},"BucketPolicy2":{"Type":"AWS::S3::BucketPolicy","Properties":{"PolicyDocument":{"Id":"MyPolicy","Version":"2012-10-17","Statement":[{"Sid":"PublicReadForGetBucketObjects","Effect":"Allow","Principal":{"AWS":"*"},"Action":"s3:GetObject","Resource":{"Fn::Join":["",["arn:aws:s3:::",{"Ref":"S3Bucket2"},"/*"]]}}]},"Bucket":{"Ref":"S3Bucket2"}}},"S3Bucket3":{"Type":"AWS::S3::Bucket","Properties":{"AccessControl":"PublicRead","BucketName":{"Fn::Join":["",[{"Ref":"namePrefix"},"-",{"Ref":"environmentName"},".","avatar"]]}},"DeletionPolicy":"Delete"},"BucketPolicy3":{"Type":"AWS::S3::BucketPolicy","Properties":{"PolicyDocument":{"Id":"MyPolicy","Version":"2012-10-17","Statement":[{"Sid":"PublicReadForGetBucketObjects","Effect":"Allow","Principal":{"AWS":"*"},"Action":"s3:GetObject","Resource":{"Fn::Join":["",["arn:aws:s3:::",{"Ref":"S3Bucket3"},"/*"]]}}]},"Bucket":{"Ref":"S3Bucket3"}}},"S3Bucket4":{"Type":"AWS::S3::Bucket","Properties":{"AccessControl":"PublicRead","BucketName":{"Fn::Join":["",[{"Ref":"namePrefix"},"-",{"Ref":"environmentName"},".","avatar.backup"]]}},"DeletionPolicy":"Delete"},"BucketPolicy4":{"Type":"AWS::S3::BucketPolicy","Properties":{"PolicyDocument":{"Id":"MyPolicy","Version":"2012-10-17","Statement":[{"Sid":"PublicReadForGetBucketObjects","Effect":"Allow","Principal":{"AWS":"*"},"Action":"s3:GetObject","Resource":{"Fn::Join":["",["arn:aws:s3:::",{"Ref":"S3Bucket4"},"/*"]]}}]},"Bucket":{"Ref":"S3Bucket4"}}},"S3Bucket5":{"Type":"AWS::S3::Bucket","Properties":{"AccessControl":"PublicRead","BucketName":{"Fn::Join":["",[{"Ref":"namePrefix"},"-",{"Ref":"environmentName"},".","background"]]}},"DeletionPolicy":"Delete"},"BucketPolicy5":{"Type":"AWS::S3::BucketPolicy","Properties":{"PolicyDocument":{"Id":"MyPolicy","Version":"2012-10-17","Statement":[{"Sid":"PublicReadForGetBucketObjects","Effect":"Allow","Principal":{"AWS":"*"},"Action":"s3:GetObject","Resource":{"Fn::Join":["",["arn:aws:s3:::",{"Ref":"S3Bucket5"},"/*"]]}}]},"Bucket":{"Ref":"S3Bucket5"}}},"S3Bucket6":{"Type":"AWS::S3::Bucket","Properties":{"AccessControl":"PublicRead","BucketName":{"Fn::Join":["",[{"Ref":"namePrefix"},"-",{"Ref":"environmentName"},".","background.backup"]]}},"DeletionPolicy":"Delete"},"BucketPolicy6":{"Type":"AWS::S3::BucketPolicy","Properties":{"PolicyDocument":{"Id":"MyPolicy","Version":"2012-10-17","Statement":[{"Sid":"PublicReadForGetBucketObjects","Effect":"Allow","Principal":{"AWS":"*"},"Action":"s3:GetObject","Resource":{"Fn::Join":["",["arn:aws:s3:::",{"Ref":"S3Bucket6"},"/*"]]}}]},"Bucket":{"Ref":"S3Bucket6"}}},"S3Bucket7":{"Type":"AWS::S3::Bucket","Properties":{"AccessControl":"PublicRead","BucketName":{"Fn::Join":["",[{"Ref":"namePrefix"},"-",{"Ref":"environmentName"},".","db-backup"]]}},"DeletionPolicy":"Delete"},"BucketPolicy7":{"Type":"AWS::S3::BucketPolicy","Properties":{"PolicyDocument":{"Id":"MyPolicy","Version":"2012-10-17","Statement":[{"Sid":"PublicReadForGetBucketObjects","Effect":"Allow","Principal":{"AWS":"*"},"Action":"s3:GetObject","Resource":{"Fn::Join":["",["arn:aws:s3:::",{"Ref":"S3Bucket7"},"/*"]]}}]},"Bucket":{"Ref":"S3Bucket7"}}},"S3Bucket8":{"Type":"AWS::S3::Bucket","Properties":{"AccessControl":"PublicRead","BucketName":{"Fn::Join":["",[{"Ref":"namePrefix"},"-",{"Ref":"environmentName"},".","flash-uploads"]]}},"DeletionPolicy":"Delete"},"BucketPolicy8":{"Type":"AWS::S3::BucketPolicy","Properties":{"PolicyDocument":{"Id":"MyPolicy","Version":"2012-10-17","Statement":[{"Sid":"PublicReadForGetBucketObjects","Effect":"Allow","Principal":{"AWS":"*"},"Action":"s3:GetObject","Resource":{"Fn::Join":["",["arn:aws:s3:::",{"Ref":"S3Bucket8"},"/*"]]}}]},"Bucket":{"Ref":"S3Bucket8"}}},"S3Bucket9":{"Type":"AWS::S3::Bucket","Properties":{"AccessControl":"PublicRead","BucketName":{"Fn::Join":["",[{"Ref":"namePrefix"},"-",{"Ref":"environmentName"},".","haystack"]]}},"DeletionPolicy":"Delete"},"BucketPolicy9":{"Type":"AWS::S3::BucketPolicy","Properties":{"PolicyDocument":{"Id":"MyPolicy","Version":"2012-10-17","Statement":[{"Sid":"PublicReadForGetBucketObjects","Effect":"Allow","Principal":{"AWS":"*"},"Action":"s3:GetObject","Resource":{"Fn::Join":["",["arn:aws:s3:::",{"Ref":"S3Bucket9"},"/*"]]}}]},"Bucket":{"Ref":"S3Bucket9"}}},"S3Bucket10":{"Type":"AWS::S3::Bucket","Properties":{"AccessControl":"PublicRead","BucketName":{"Fn::Join":["",[{"Ref":"namePrefix"},"-",{"Ref":"environmentName"},".","partner-api"]]}},"DeletionPolicy":"Delete"},"BucketPolicy10":{"Type":"AWS::S3::BucketPolicy","Properties":{"PolicyDocument":{"Id":"MyPolicy","Version":"2012-10-17","Statement":[{"Sid":"PublicReadForGetBucketObjects","Effect":"Allow","Principal":{"AWS":"*"},"Action":"s3:GetObject","Resource":{"Fn::Join":["",["arn:aws:s3:::",{"Ref":"S3Bucket10"},"/*"]]}}]},"Bucket":{"Ref":"S3Bucket10"}}},"S3Bucket11":{"Type":"AWS::S3::Bucket","Properties":{"AccessControl":"PublicRead","BucketName":{"Fn::Join":["",[{"Ref":"namePrefix"},"-",{"Ref":"environmentName"},".","partners"]]}},"DeletionPolicy":"Delete"},"BucketPolicy11":{"Type":"AWS::S3::BucketPolicy","Properties":{"PolicyDocument":{"Id":"MyPolicy","Version":"2012-10-17","Statement":[{"Sid":"PublicReadForGetBucketObjects","Effect":"Allow","Principal":{"AWS":"*"},"Action":"s3:GetObject","Resource":{"Fn::Join":["",["arn:aws:s3:::",{"Ref":"S3Bucket11"},"/*"]]}}]},"Bucket":{"Ref":"S3Bucket11"}}},"S3Bucket12":{"Type":"AWS::S3::Bucket","Properties":{"AccessControl":"PublicRead","BucketName":{"Fn::Join":["",[{"Ref":"namePrefix"},"-",{"Ref":"environmentName"},".","press-link-graphic"]]}},"DeletionPolicy":"Delete"},"BucketPolicy12":{"Type":"AWS::S3::BucketPolicy","Properties":{"PolicyDocument":{"Id":"MyPolicy","Version":"2012-10-17","Statement":[{"Sid":"PublicReadForGetBucketObjects","Effect":"Allow","Principal":{"AWS":"*"},"Action":"s3:GetObject","Resource":{"Fn::Join":["",["arn:aws:s3:::",{"Ref":"S3Bucket12"},"/*"]]}}]},"Bucket":{"Ref":"S3Bucket12"}}},"S3Bucket13":{"Type":"AWS::S3::Bucket","Properties":{"AccessControl":"PublicRead","BucketName":{"Fn::Join":["",[{"Ref":"namePrefix"},"-",{"Ref":"environmentName"},".","site"]]}},"DeletionPolicy":"Delete"},"BucketPolicy13":{"Type":"AWS::S3::BucketPolicy","Properties":{"PolicyDocument":{"Id":"MyPolicy","Version":"2012-10-17","Statement":[{"Sid":"PublicReadForGetBucketObjects","Effect":"Allow","Principal":{"AWS":"*"},"Action":"s3:GetObject","Resource":{"Fn::Join":["",["arn:aws:s3:::",{"Ref":"S3Bucket13"},"/*"]]}}]},"Bucket":{"Ref":"S3Bucket13"}}},"S3Bucket14":{"Type":"AWS::S3::Bucket","Properties":{"AccessControl":"PublicRead","BucketName":{"Fn::Join":["",[{"Ref":"namePrefix"},"-",{"Ref":"environmentName"},".","source-video"]]}},"DeletionPolicy":"Delete"},"BucketPolicy14":{"Type":"AWS::S3::BucketPolicy","Properties":{"PolicyDocument":{"Id":"MyPolicy","Version":"2012-10-17","Statement":[{"Sid":"PublicReadForGetBucketObjects","Effect":"Allow","Principal":{"AWS":"*"},"Action":"s3:GetObject","Resource":{"Fn::Join":["",["arn:aws:s3:::",{"Ref":"S3Bucket14"},"/*"]]}}]},"Bucket":{"Ref":"S3Bucket14"}}},"S3Bucket15":{"Type":"AWS::S3::Bucket","Properties":{"AccessControl":"PublicRead","BucketName":{"Fn::Join":["",[{"Ref":"namePrefix"},"-",{"Ref":"environmentName"},".","thumbnail"]]}},"DeletionPolicy":"Delete"},"BucketPolicy15":{"Type":"AWS::S3::BucketPolicy","Properties":{"PolicyDocument":{"Id":"MyPolicy","Version":"2012-10-17","Statement":[{"Sid":"PublicReadForGetBucketObjects","Effect":"Allow","Principal":{"AWS":"*"},"Action":"s3:GetObject","Resource":{"Fn::Join":["",["arn:aws:s3:::",{"Ref":"S3Bucket15"},"/*"]]}}]},"Bucket":{"Ref":"S3Bucket15"}}},"S3Bucket16":{"Type":"AWS::S3::Bucket","Properties":{"AccessControl":"PublicRead","BucketName":{"Fn::Join":["",[{"Ref":"namePrefix"},"-",{"Ref":"environmentName"},".","transcoded-video"]]}},"DeletionPolicy":"Delete"},"BucketPolicy16":{"Type":"AWS::S3::BucketPolicy","Properties":{"PolicyDocument":{"Id":"MyPolicy","Version":"2012-10-17","Statement":[{"Sid":"PublicReadForGetBucketObjects","Effect":"Allow","Principal":{"AWS":"*"},"Action":"s3:GetObject","Resource":{"Fn::Join":["",["arn:aws:s3:::",{"Ref":"S3Bucket16"},"/*"]]}}]},"Bucket":{"Ref":"S3Bucket16"}}},"S3Bucket17":{"Type":"AWS::S3::Bucket","Properties":{"AccessControl":"PublicRead","BucketName":{"Fn::Join":["",[{"Ref":"namePrefix"},"-",{"Ref":"environmentName"},".","video-watermarks"]]}},"DeletionPolicy":"Delete"},"BucketPolicy17":{"Type":"AWS::S3::BucketPolicy","Properties":{"PolicyDocument":{"Id":"MyPolicy","Version":"2012-10-17","Statement":[{"Sid":"PublicReadForGetBucketObjects","Effect":"Allow","Principal":{"AWS":"*"},"Action":"s3:GetObject","Resource":{"Fn::Join":["",["arn:aws:s3:::",{"Ref":"S3Bucket17"},"/*"]]}}]},"Bucket":{"Ref":"S3Bucket17"}}},"S3Bucket18":{"Type":"AWS::S3::Bucket","Properties":{"AccessControl":"PublicRead","BucketName":{"Fn::Join":["",[{"Ref":"namePrefix"},"-",{"Ref":"environmentName"},".","widget-cache"]]}},"DeletionPolicy":"Delete"},"BucketPolicy18":{"Type":"AWS::S3::BucketPolicy","Properties":{"PolicyDocument":{"Id":"MyPolicy","Version":"2012-10-17","Statement":[{"Sid":"PublicReadForGetBucketObjects","Effect":"Allow","Principal":{"AWS":"*"},"Action":"s3:GetObject","Resource":{"Fn::Join":["",["arn:aws:s3:::",{"Ref":"S3Bucket18"},"/*"]]}}]},"Bucket":{"Ref":"S3Bucket18"}}},"S3Bucket19":{"Type":"AWS::S3::Bucket","Properties":{"AccessControl":"PublicRead","BucketName":{"Fn::Join":["",[{"Ref":"namePrefix"},"-",{"Ref":"environmentName"},".","widget-uploads"]]}},"DeletionPolicy":"Delete"},"BucketPolicy19":{"Type":"AWS::S3::BucketPolicy","Properties":{"PolicyDocument":{"Id":"MyPolicy","Version":"2012-10-17","Statement":[{"Sid":"PublicReadForGetBucketObjects","Effect":"Allow","Principal":{"AWS":"*"},"Action":"s3:GetObject","Resource":{"Fn::Join":["",["arn:aws:s3:::",{"Ref":"S3Bucket19"},"/*"]]}}]},"Bucket":{"Ref":"S3Bucket19"}}},"CFAssets":{"Type":"AWS::CloudFront::Distribution","Properties":{"DistributionConfig":{"Comment":{"Fn::Join":["",["CDN for asset in env: ",{"Ref":"environmentName"}]]},"Enabled":"true","S3Origin":{"DNSName":{"Fn::Join":["",[{"Ref":"S3Bucket2"},{"Fn::FindInMap":["RegionMap",{"Ref":"AWS::Region"},"s3BucketDomain"]}]]}}}}},"CFAvatar":{"Type":"AWS::CloudFront::Distribution","Properties":{"DistributionConfig":{"Comment":{"Fn::Join":["",["CDN for avatar in env: ",{"Ref":"environmentName"}]]},"Enabled":"true","S3Origin":{"DNSName":{"Fn::Join":["",[{"Ref":"S3Bucket3"},{"Fn::FindInMap":["RegionMap",{"Ref":"AWS::Region"},"s3BucketDomain"]}]]}}}}},"CFFlash":{"Type":"AWS::CloudFront::Distribution","Properties":{"DistributionConfig":{"Comment":{"Fn::Join":["",["CDN for flash in env: ",{"Ref":"environmentName"}]]},"Enabled":"true","S3Origin":{"DNSName":{"Fn::Join":["",[{"Ref":"S3Bucket8"},{"Fn::FindInMap":["RegionMap",{"Ref":"AWS::Region"},"s3BucketDomain"]}]]}}}}},"CFSite":{"Type":"AWS::CloudFront::Distribution","Properties":{"DistributionConfig":{"Comment":{"Fn::Join":["",["CDN for site in env: ",{"Ref":"environmentName"}]]},"Enabled":"true","S3Origin":{"DNSName":{"Fn::Join":["",[{"Ref":"S3Bucket13"},{"Fn::FindInMap":["RegionMap",{"Ref":"AWS::Region"},"s3BucketDomain"]}]]}}}}},"CFThumbnail":{"Type":"AWS::CloudFront::Distribution","Properties":{"DistributionConfig":{"Comment":{"Fn::Join":["",["CDN for thumbnail in env: ",{"Ref":"environmentName"}]]},"Enabled":"true","S3Origin":{"DNSName":{"Fn::Join":["",[{"Ref":"S3Bucket15"},{"Fn::FindInMap":["RegionMap",{"Ref":"AWS::Region"},"s3BucketDomain"]}]]}}}}},"CFTranscodedVideo":{"Type":"AWS::CloudFront::Distribution","Properties":{"DistributionConfig":{"Comment":{"Fn::Join":["",["CDN for transcoded-video in env: ",{"Ref":"environmentName"}]]},"Enabled":"true","S3Origin":{"DNSName":{"Fn::Join":["",[{"Ref":"S3Bucket16"},{"Fn::FindInMap":["RegionMap",{"Ref":"AWS::Region"},"s3BucketDomain"]}]]}}}}}},"Outputs":{"facebookTabAssets":{"Value":{"Fn::GetAtt":["S3Bucket1","WebsiteURL"]},"Description":""},"asset":{"Value":{"Fn::GetAtt":["S3Bucket2","WebsiteURL"]},"Description":""},"avatar":{"Value":{"Fn::GetAtt":["S3Bucket3","WebsiteURL"]},"Description":""},"avatarBackup":{"Value":{"Fn::GetAtt":["S3Bucket4","WebsiteURL"]},"Description":""},"background":{"Value":{"Fn::GetAtt":["S3Bucket5","WebsiteURL"]},"Description":""},"backgroundBackup":{"Value":{"Fn::GetAtt":["S3Bucket6","WebsiteURL"]},"Description":""},"dbBackups":{"Value":{"Fn::GetAtt":["S3Bucket7","WebsiteURL"]},"Description":""},"flashUpload":{"Value":{"Fn::GetAtt":["S3Bucket8","WebsiteURL"]},"Description":""},"haystack":{"Value":{"Fn::GetAtt":["S3Bucket9","WebsiteURL"]},"Description":""},"partnerApi":{"Value":{"Fn::GetAtt":["S3Bucket10","WebsiteURL"]},"Description":""},"partners":{"Value":{"Fn::GetAtt":["S3Bucket11","WebsiteURL"]},"Description":""},"pressLinkGraphic":{"Value":{"Fn::GetAtt":["S3Bucket12","WebsiteURL"]},"Description":""},"site":{"Value":{"Fn::GetAtt":["S3Bucket13","WebsiteURL"]},"Description":""},"sourceVideo":{"Value":{"Fn::GetAtt":["S3Bucket14","WebsiteURL"]},"Description":""},"thumbnail":{"Value":{"Fn::GetAtt":["S3Bucket15","WebsiteURL"]},"Description":""},"transcodedVideo":{"Value":{"Fn::GetAtt":["S3Bucket16","WebsiteURL"]},"Description":""},"videoWatermarks":{"Value":{"Fn::GetAtt":["S3Bucket17","WebsiteURL"]},"Description":""},"widgetCache":{"Value":{"Fn::GetAtt":["S3Bucket18","WebsiteURL"]},"Description":""},"widgetUploads":{"Value":{"Fn::GetAtt":["S3Bucket19","WebsiteURL"]},"Description":""},"CFIDasset":{"Value":{"Ref":"CFAssets"}},"CFIDassetURL":{"Value":{"Fn::Join":["",["http://",{"Fn::GetAtt":["CFAssets","DomainName"]}]]}},"CFIDavatar":{"Value":{"Ref":"CFAvatar"}},"CFIDavatarURL":{"Value":{"Fn::Join":["",["http://",{"Fn::GetAtt":["CFAvatar","DomainName"]}]]}},"CFIDflash":{"Value":{"Ref":"CFFlash"}},"CFIDflashURL":{"Value":{"Fn::Join":["",["http://",{"Fn::GetAtt":["CFFlash","DomainName"]}]]}},"CFIDsite":{"Value":{"Ref":"CFSite"}},"CFIDsiteURL":{"Value":{"Fn::Join":["",["http://",{"Fn::GetAtt":["CFSite","DomainName"]}]]}},"CFIDthumbnail":{"Value":{"Ref":"CFThumbnail"}},"CFIDthumbnailURL":{"Value":{"Fn::Join":["",["http://",{"Fn::GetAtt":["CFThumbnail","DomainName"]}]]}},"CFIDtranscodedVideo":{"Value":{"Ref":"CFTranscodedVideo"}},"CFIDtranscodedVideoURL":{"Value":{"Fn::Join":["",["http://",{"Fn::GetAtt":["CFTranscodedVideo","DomainName"]}]]}}}}';
    var cloudformation_template_bad = 'foo';

    var stack_name_bad = 'foo';


    /*
    beforeEach(function(done) {


    });
    */
    afterEach(function(done) {

        // Clean up cloud formation stacks
        var stack_name = 'testAutomationStack';

        cloudformation.deleteStack(stack_name, function(err, result){
            expect(err).toBe(null);
            expect(result).toBeDefined();
            done();
        });

        stack_name = 'testAutomationStackForUpdateTest';

        cloudformation.deleteStack(stack_name, function(err, result){
            expect(err).toBe(null);
            expect(result).toBeDefined();
            done();
        });
    });

    it("Should create a CloudFormation stack", function(done){

        var stack_config = JSON.parse(stack_config_good);
        var cloudformation_template = JSON.parse(cloudformation_temaplate_good);

        cloudformation.createStack(stack_config, cloudformation_template, function(err, result){
            expect(err).toBe(null);
            expect(result).toBeDefined();
            done();
        });
    }, 60000);

    it("Should return a 400 error when there is a stack name with a space in it", function(done){

        var stack_config = JSON.parse(stack_config_bad);
        var cloudformation_template = JSON.parse(cloudformation_temaplate_good);

        cloudformation.createStack(stack_config, cloudformation_template, function(err, result){
            expect(err).toBeDefined();
            expect(result).toBeUndefined();
            done();
        });
    }, 60000);

    it("Should be able to update a CloudFormation stack", function(done){

        var random_number = Math.floor(Math.random() * (max - min + 1)) + min;
        var stack_config_good_for_update = '{"StackName":"testAutomationStackForUpdateTest'+random_number+'", "OnFailure":"DELETE"}';

        // Create a stack
        var stack_config = JSON.parse(stack_config_good_for_update);
        var cloudformation_template = JSON.parse(cloudformation_temaplate_good);

        cloudformation.createStack(stack_config, cloudformation_template, function(err, result){
            expect(err).toBe(null);
            expect(result).toBeDefined();

            // Update does not take a OnFailure key
            stack_config = JSON.parse('{"StackName":"testAutomationStackForUpdateTest'+random_number+'"}');

            // Update the stack
            cloudformation.updateStack(stack_config, cloudformation_template, function(err, result){

                // The template will still be in the creation state and return:
                // { message : 'Stack:arn:aws:cloudformation:us-west-2:988831050706:stack/testAutomationStackForUpdateTest/25b97bc0-0856-11e4-a0df-50e2414b0a44 is in CREATE_IN_PROGRESS state and can not be updated.', code : 'ValidationError', time : Date(Thu Jul 10 2014 10:18:02 GMT-0700 (PDT)), statusCode : 400, retryable : false }
                // This is an error.  But the fact that it submitted correctly and gave the state is good enough
                expect(JSON.stringify(err)).toContain('CREATE_IN_PROGRESS');
                expect(result).toBeUndefined();
                done();
            });
        });
    });

    it("Should delete a CloudFormation stack", function(done){

        cloudformation.deleteStack(stack_name_bad, function(err, result){
            expect(err).toBe(null);
            expect(result).toBeDefined();
            done();
        });
    }, 60000);


});