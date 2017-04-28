var db = require('../db/db')

exports.all = function(cb) {
  var collection = db.get().collection('comments')

  collection.find().toArray(function(err, docs) {
    cb(err, docs)
  })
}

exports.recent = function(cb) {
  var collection = db.get().collection('comments')

  collection.find().sort({'date': -1}).limit(100).toArray(function(err, docs) {
    cb(err, docs)
  })
}


exports.food = function(cb) {

    var collection = db.get().collection('foods')

    collection.find({name: 'taco'}).toArray(function(err, docs) {
        cb(null, docs );
    })
}