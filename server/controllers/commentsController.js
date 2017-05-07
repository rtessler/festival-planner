var express = require('express')
var router = express.Router()

var CommentsModel = require('../models/commentsModel')

router.get('/all', function(req, res) {
  Comments.all(function(err, docs) {
    res.render('comments', {comments: docs})
  })
})

router.get('/recent', function(req, res) {
  Comments.recent(function(err, docs) {
    res.render('comments', {comments: docs})
  })
})

router.get("/food", function(req, res) {

  Comments.food(function(err, docs) {
    
    res.end( JSON.stringify(docs[0]) )
  })
});

module.exports = router