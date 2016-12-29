var express = require('express')
  , router = express.Router()

var Comments = require('../models/comments')

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