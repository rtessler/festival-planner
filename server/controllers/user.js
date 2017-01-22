var express = require('express')
var router = express.Router()

var bodyParser = require('body-parser');        // for post requests
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var User = require('../models/user')

router.get('/all', function(req, res) {

  User.all(function(data) {

    res.end( JSON.stringify(data) )
  })
})

router.get('/findByName', function(req, res) {

  var name = req.query.name;

  User.findByName(name, function(data) {

    res.end( JSON.stringify(data) )

  })
})

router.post('/create', urlencodedParser, function(req, res) {

  var data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    mobilePhone: req.body.mobilePhone,
    workPhone: req.body.workPhone,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    countryCode: req.body.countryCode,
    email: req.body.email,
    password: req.body.password
  }

  User.create(data, function (data) {

    console.log("id = " + data._id);

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