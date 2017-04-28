var express = require('express');
var app = express();

var bodyParser = require('body-parser');        // for post requests
var fs = require("fs");                         // for file system
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var multer = require('multer');
var cookieParser = require('cookie-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
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

//var db = require('./db/db')
var mongooseDb = require("./db/mongooseDb");

/*
app.get("/getFood", function(req, res) {

    var collection = db.get().collection('foods')

    collection.find({name: 'taco'}).toArray(function(err, docs) {
        res.end(JSON.stringify(docs[0]));
    })
})


app.post('/addFood', urlencodedParser, function (req, res) {
    // Prepare output in JSON format
    response = {
        first_name: req.body.first_name,
        last_name: req.body.last_name
    };

    MongoClient.connect(URL, function(err, db) {

      if (err) return

      var collection = db.collection('foods')
      collection.insert({name: 'taco', tasty: true}, function(err, result) {

      })
    })

    res.end(JSON.stringify(response));
})

app.get('/index.html', function (req, res) {

    console.log("Cookies: ", req.cookies);

    res.sendFile(__dirname + "/" + "index.html");
})

app.get('/cookie', function (req, res) {

    console.log("Cookies: ", req.cookies);

    res.send('give me a cookie');
})

app.get('/process_get', function (req, res) {
    // Prepare output in JSON format
    response = {
        first_name: req.query.first_name,
        last_name: req.query.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
})

app.post('/process_post', urlencodedParser, function (req, res) {
    // Prepare output in JSON format
    response = {
        first_name: req.body.first_name,
        last_name: req.body.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
})

app.post('/file_upload', function (req, res) {

    console.log(req.file);

    console.log(req.file.originalname);
    console.log(req.file.filename);
    console.log(req.file.path);
    console.log(req.file.mimetype);

    console.log(__dirname);
    
    var file = __dirname + "/uploads/" + req.file.originalname;

    fs.readFile(req.file.path, function (err, data) {
        fs.writeFile(file, data, function (err) {
            if (err) {
                console.log(err);
            } else {
                response = {
                    message: 'File uploaded successfully',
                    filename: req.file.originalname
                };
            }
            console.log(response);
            res.end(JSON.stringify(response));
        });
    });
})

app.get('/', function (req, res) {
   res.send('Hello World');
})

// This responds a POST request for the homepage
app.post('/', function (req, res) {
    console.log("Got a POST request for the homepage");
    res.send('Hello POST');
})

// This responds a DELETE request for the /del_user page.
app.delete('/del_user', function (req, res) {
    console.log("Got a DELETE request for /del_user");
    res.send('Hello DELETE');
})

// This responds a GET request for the /list_user page.
app.get('/list_user', function (req, res) {
    console.log("Got a GET request for /list_user");
    res.send('Page Listing');
})

// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get('/ab*cd', function (req, res) {
    console.log("Got a GET request for /ab*cd");
    res.send('Page Pattern Match');
})
*/

var dburl = 'mongodb://localhost:27017/festival';

mongooseDb.connect(dburl, function(err) { 

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


