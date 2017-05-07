var express = require('express')
var router = express.Router()

var bodyParser = require('body-parser');        // for post requests
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//router.use(urlencodedParser);

var FestivalModel = require('../models/festivalModel');

router.get('/all', function(req, res) {

  FestivalModel.all(function(data) {

    res.end( JSON.stringify(data) )
  })
})

router.get('/findByName', function(req, res) {

  var name = req.query.name;

  FestivalModel.findByName(name, function(err, data) {

    res.end( JSON.stringify(data) )
  })
})

router.post('/create', urlencodedParser, function(req, res) {

  //text = req.body.text

  console.log("festivalController: create");

  var data = {
    name: req.body.name,
    dateFrom: req.body.dateFrom, 
    dateTo: req.body.dateTo,
    title: req.body.title, 
    description: req.body.description,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    countryCode: req.body.countryCode,
    creatorEmail: req.body.createEmail,
    ticketURL: req.body.ticketURL,
    website: req.body.website,
    facebookURL: req.body.facebookURL};

    console.log(data);

  FestivalModel.create(data, function (result) {

      console.log("festival controller: create ok");
      console.log("festival controller: result = ");
      console.log(result);
   
      res.end( JSON.stringify(result) );
  });
})

router.put('/update', urlencodedParser, function(req, res) {

  var id = req.body.id;
  var data = req.body;

  FestivalModel.update(id, data, function (result) {

      console.log("festival controller: update ok");
      console.log("festival controller: result = ");
      console.log(result);
   
      res.end( JSON.stringify(result) );
  })
})

/*
router.get('/:id', function(req, res) {
  Comment.get(req.params.id, function (err, comment) {
    res.render('comments/comment', {comment: comment})
  })
})
*/

module.exports = router