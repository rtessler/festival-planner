var db = require('../db')

exports.all = function(cb) {

  var collection = db.get().collection('festival')

  collection.find().toArray(function(err, docs) {

    if (err)
      return cb({status: 0, err: err})
    
    cb({status: 1, data: docs});
  })
}

exports.findByName = function(name, cb) {

    var collection = db.get().collection('festival')

    collection.find({name: name}).sort({'dateFrom': -1}).toArray(function(err, docs) {

      if (err)
        return cb({status: 0, err: err})
      
      cb({status: 1, data: docs});
    })
}


exports.create = function(data, cb) {

  //db.save(user, cb)

  var collection = db.get().collection('festival')

  collection.insert(data, function(err, res) {

    if (err)
      return cb({status: 0, error: err});
    
    cb({status: 1, data: data} );

  });
}