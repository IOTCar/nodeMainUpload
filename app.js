var express = require('express');
var app = express();
var server = app.listen(3000);
var path = require('path');
var io = require('socket.io').listen(server);
var fs = require('fs');
var storage = require('node-persist');

//gcm send
var gcm = require('node-gcm');
//gcm send

//storage area
storage.initSync();
storage.setItem('regid','empty');
//video 

var multer = require('multer');



//about parser 
var bodyParser =require('body-parser');
var cookieParser = require('cookie-parser')
//Use area
app.use(express.static(path.join(__dirname, '/')));
//video parser
app.use(multer({ dest: './uploads/',
	onFileUploadComplete: function (file, req, res) {
		var json={"title":"test"};
  		console.log(file.fieldname + ' uploaded to  ' + file.path);
		
		//return to android side
		res.json({'response':"OK"});
		
		//send to client side
		json.filePath=file.path;
		io.emit('foo',json);
	},
	
	//upload progress
	onFileUploadData: function (file, data, req, res) {
 		 console.log(data.length + ' of ' + file.fieldname + ' arrived')
	}

}));

//Use area
app.use(cookieParser());
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
//


 
//Estable Router Object
var router= express.Router();


router.get('/',function  (req,res) {
	res.sendFile(__dirname + '/public/index.html');
});

router.get('/index.html',function  (req,res) {
        res.sendFile(__dirname + '/public/index.html');
});

router.get('/about.html',function(req,res){
	res.sendFile(__dirname + '/public/about.html');
});

router.get('/start.html',function(req,res){
	res.sendFile(__dirname + '/public/start.html');
});
router.get('/form',function  (req,res) {
	res.sendFile(__dirname + '/public/form.html');
});

//gcm send test
router.get('/gcm-send',function(req,res){
	
	var message = new gcm.Message();

	message.addData('key1', 'msg1');

	var regIds = ['APA91bEQxcmB9cvMtXcT97kVyKASP78qxVflfTNiZL_O1RcMetRanvsmgOM5SxI6WP0zhMopdxTTRl3FamP7cyWkxfrE1iT78F8qkuzM-waWV5l3Y59jSo86ikwntpaLmwuyFkw3f2d9NyjiEqtnMdnMWFreR70s5g'];

	var sender = new gcm.Sender('AIzaSyBqYuUjxzDz9PueW9YnhUJbtoarJEF4sys');

	sender.send(message, regIds, function (err, result) {
    		if(err) console.error(err);
    		else    console.log(result);
	});
});
//end test
router.post('/myaction',function  (req,res) {
	
	setTimeout(function() {
  		//console.log('Foo');
		io.emit('foo',"test");	
	}, 5000);
});

router.post('/upload', function(req, res) {
	//console.log(req.files);
	
});

router.post('/gcm', function(req, res) {
	console.log(req.body.content);


	//assign to storage
	storage.setItem('regid',req.body.content);
	//assign to storage
	
	console.log("storage-regid:"+storage.getItem('regid'));
	res.json("ok");
	res.end();
});
app.get('/uploads/:file', function (req, res){
    file = req.params.file;
    var dirname = "/home/jinniw43805/Node/file-upload";
    var img = fs.readFileSync(dirname + "/uploads/" + file);
    res.writeHead(200, {'Content-Type': 'image/jpg' });
    res.end(img, 'binary');
 
});

//
app.use('/',router);
//


//socket.io
io.on('connection', function(socket){
  console.log('a user connected');
});
//End socket.io
