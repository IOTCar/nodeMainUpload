var gcm = require('node-gcm');

var message = new gcm.Message();

message.addData('content', 'test');

var regIds = ['APA91bEQxcmB9cvMtXcT97kVyKASP78qxVflfTNiZL_O1RcMetRanvsmgOM5SxI6WP0zhMopdxTTRl3FamP7cyWkxfrE1iT78F8qkuzM-waWV5l3Y59jSo86ikwntpaLmwuyFkw3f2d9NyjiEqtnMdnMWFreR70s5g'];

var sender = new gcm.Sender('AIzaSyBDLxZCHCpqGMaChlkb27iEIlrQC1UsI4c');

sender.send(message, regIds, function (err, result) {
    if(err) console.error(err);
    else    console.log(result);
});
