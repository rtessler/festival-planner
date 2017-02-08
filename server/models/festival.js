var db = require('../db')

var mongoose = require('mongoose');

var festivalSchema = mongoose.Schema({
  name: String,
  dateFrom: Date,
  dateTo: Date,
  largeImage: String,
  smallImage: String,
  images: Array,
  title: String, 
  description: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  countryCode: String,
  creatorEmail: String,
  ticketURL: String,
  website: String,
  facebookURL: String,
  dateCreated: Date,
  dateModified: Date
}, {collection: 'festival'});

var Festival = mongoose.model('festival', festivalSchema);

exports.all = function(cb) {

  Festival.find({}, function(err, data) {

    if (err)
        return cb({status: 0, err: err})

    cb({status: 1, data: data});
  });
}

exports.findByName = function(name, cb) {

  var regex = new RegExp(["^", name, "$"].join(""), "i");

  Festival.find({ name: regex }, function(err, data) {

    if (err)
      return cb({status: 0, err: err})

    cb({status: 1, data: data});
  });
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

// mongo client version

/*

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

*/