var express = require('express')
var router = express.Router()

var comments = require('./comments')
var festival = require('./festival')
var user = require('./user')

router.use('/api/v1/comments', comments)
router.use('/api/v1/festival', festival)
router.use('/api/v1/user', user)

router.get('/', function(req, res) {

 	console.log("default route")

    console.log("Cookies: ", req.cookies);

    res.sendFile(__dirname + "/" + "index.html");
})

module.exports = router