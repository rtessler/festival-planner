var express = require('express')
var router = express.Router()

var bodyParser = require('body-parser');        // for post requests
var urlencodedParser = bodyParser.urlencoded({ extended: false });
  //app.use(bodyParser.urlencoded({ extended: false }));

var Festival = require('../models/festival')

router.get('/all', function(req, res) {

  Festival.all(function(data) {

    res.end( JSON.stringify(data) )
  })
})

router.get('/findByName', function(req, res) {

  var name = req.query.name;

  Festival.findByName(name, function(err, data) {

    res.end( JSON.stringify(data) )
  })
})

router.post('/create', urlencodedParser, function(req, res) {

  text = req.body.text

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
    facebookURL: req.body.facebookURL};

  Festival.create(data, function (err, data) {
   
      res.end( JSON.stringify(data) )
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