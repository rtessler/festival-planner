var express = require('express');
var app = express();

var bodyParser = require('body-parser');        // for post requests
var fs = require("fs");                         // for file system
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var multer = require('multer');
var cookieParser = require('cookie-parser');

app.use(express.static('public'));
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(urlencodedParser);
app.use(bodyParser.json());
app.use(multer({ dest: './tmp/' }).single('picture'));      // files get loaded to this directory with unique names
app.use(cookieParser())

app.set('views', __dirname + '/views')
//app.engine('pug', require('pug').__express)
app.set('view engine', 'pug')

//app.use('/comments', require('./controllers/comments'))
//app.use('/api/v1/festival', require('./controllers/festival'))

//var router = require('./controllers/index')

var index = require("./controllers/index");
app.use(index);

var mongooseClient = require("./db/mongooseClient");

var dburl = "mongodb://localhost:27017/festival";

mongooseClient.connect(dburl, function(err) { 

  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {

    var server = app.listen(8082, function () {
       var host = server.address().address
       var port = server.address().port
       
       console.log("Example app listening at http://%s:%s", host, port);
    })
  }
});

/*
var db = require('./db/mongoClient');

db.connect('mongodb://localhost:27017/festival', function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {

    var server = app.listen(8082, function () {
       var host = server.address().address
       var port = server.address().port
       
       console.log("Example app listening at http://%s:%s", host, port);
    })
  }
})
*/


