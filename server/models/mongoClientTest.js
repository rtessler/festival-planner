
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
