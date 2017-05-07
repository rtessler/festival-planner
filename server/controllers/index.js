var express = require('express')
var router = express.Router()

var commentsController = require('./commentsController')
var festivalController = require('./festivalController')
var userController = require('./userController')

router.use('/api/v1/comments', commentsController)
router.use('/api/v1/festival', festivalController)
router.use('/api/v1/user', userController)

/*
router.get('/home', function (req, res) {

    console.log('im here');
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})
*/

router.get('/', function(req, res) {
  
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})

/*
router.get('/', function(req, res) {

 	console.log("default route")

    console.log("Cookies: ", req.cookies);

    res.sendFile(__dirname + "/" + "index.html");
})
*/

module.exports = router