var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname + "/static")));
app.set('views', path.join(__dirname + "/views"));
app.set('view engine', 'ejs');
app.get('/', function(req, res){
	res.render('index');
});
var server = app.listen(2021, function(){
	console.log("HACK_THE_PLANET");
});
var io = require("socket.io").listen(server);
io.sockets.on('connection', function(socket){
	socket.on('initiate', function(user){
		console.log(user.user + " has entered the room");
		io.emit('contact', {chat_id: user});
	});
	socket.on('append_chat', function(data){
		console.log(data.user + ' ' + data.message);
		io.emit('fireback', { data });
	})
});