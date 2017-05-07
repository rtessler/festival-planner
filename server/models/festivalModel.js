//var db = require('../db/mongoClient');
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

var FestivalModel = mongoose.model('festivalModel', festivalSchema);

exports.all = function(cb) {

  FestivalModel.find({}, function(err, data) {

    if (err)
        return cb({status: 0, err: err})

    cb({status: 1, data: data});
  });
}

exports.findByName = function(name, cb) {

  var regex = new RegExp(["^", name, "$"].join(""), "i");

  FestivalModel.find({ name: regex }, function(err, data) {

    if (err)
      return cb({status: 0, err: err})

    cb({status: 1, data: data});
  });
}


exports.create = function(data, cb) {

  data.dateCreated = new Date();
  data.dateModified = new Date();

  var model = new FestivalModel(data);

  model.save(function(err,res) {

    console.log('festivalModel.create: res.id = ' + res.id);
    console.log(res);

    if (err)
        return cb({status: 0, error: err});

      cb({status: 1, data: res});
  });

/*
    var query = {'username':req.user.username};
req.newData.username = req.user.username;
MyModel.findOneAndUpdate(query, req.newData, {upsert:true}, function(err, doc){
    if (err) return res.send(500, { error: err });
    return res.send("succesfully saved");
});
*/
}

exports.update = function(id, data, cb) {

    data.dateModified = new Date();

    FestivalModel.findByIdAndUpdate(id, data, function(err, res) {

      console.log('festivalModel.update: ok');

      if (err)
          return cb({status: 0, error: err});

      cb({status: 1, data: res});
  });
}

/*

  festival.save(function (err, res) {

      if (err)
        return cb({status: 0, error: err});

      cb({status: 1, data: res});
  })
*/

/*

  FestivalModel.create(data, function(err, res) {

    console.log("models/festival.create data = ");
    console.log(res);

    if (err)
      return cb({status: 0, error: err});

    console.log("models/festival.create got to here");
    
    cb({status: 1, data: res});
  });
}
*/

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

exports.create = function(data, cb) {

  db.save(user, cb);

  var collection = db.get().collection('festival')

  collection.insert(data, function(err, res) {

    if (err)
      return cb({status: 0, error: err});
    
    cb({status: 1, data: data} );

  });
}

*/