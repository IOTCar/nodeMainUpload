var express = require('express');
var app = express();
var server = app.listen(3000);
var path = require('path');
var io = require('socket.io').listen(server);
var fs = require('fs');


//video 

var multer = require('multer');

//about parser 
var bodyParser =require('body-parser');
var cookieParser = require('cookie-parser')

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
app.use(express.static(path.join(__dirname, '/')));
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


router.get('/form',function  (req,res) {
	res.sendFile(__dirname + '/public/form.html');
});



router.post('/myaction',function  (req,res) {
	res.send('You sent the name "' + req.body.name + '".');
});

router.post('/upload', function(req, res) {
	//console.log(req.files);
	
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
