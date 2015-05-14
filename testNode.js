var gcm = require('node-gcm');

var message = new gcm.Message();

message.addData('content', 'test');

var regIds =['APA91bFxQ0226d3OA-AiJfJ_GIcQCnxcLhzaIHu2D56SWq0RCGPaIyIbyHo9WDyK_dx6HtjlQkSaH2iTmqQG4JcgyQZC5g3wDUdTETQfclrzVrV7tu6tk4Cb4SWMKXrEcR4BETR0TRJeiUGv01-LyteGCDqSQaWKuA'];
var sender = new gcm.Sender('AIzaSyDPp9KP--MYT0r1REAFGxpVhXXf1FwH3F0');

sender.send(message, regIds, function (err, result) {
    if(err) console.error(err);
    else    console.log(result);
});
