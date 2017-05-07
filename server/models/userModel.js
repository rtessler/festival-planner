var db = require('../db/mongoClient');
var crypto = require('crypto');
var mongoose = require('mongoose');

var userSchema = mongoose.Schema ({
firstName: String,
lastName: String,
mobilePhone: String,
workPhone: String,
address: String,
city: String,
state:String,
zip: String,
countryCode: String,
email: String,
password: String,
smallImage: String,
largeImage: String,
dateCreated: Date,
dateModified: Date
}, {collection: 'user'});

/*
	  var User = mongoose.model('user', userSchema);

	  var x = new User({
			firstName: "Yuki",
			lastName: "Tessler",
			mobilePhone: "0434991180",
			workPhone: null,
			address: "58 Kingston st",
			city: "Haberfield",
			state: "NSW",
			zip: "2045",
			countryCode: "AU",
			email: "robert@rtessler.com",
			password: null,
			smallImage: null,
			largeImage: null,
			dateCreated: new Date(),
			dateModified: new Date()
			});

	  x.save(function (err, user) {
		  if (err) return console.error(err);
		  
		  console.log("user saved");
		});
*/

// mongo client

hash = function(password) {
  return crypto.createHash('sha1').update(password).digest('base64')
}

exports.all = function(cb) {

  var collection = db.get().collection('user')

  collection.find().toArray(function(err, data) {

    if (err)
      return cb({status: 0, error: err})
    
    cb({status: 1, data: data});
  })
}

exports.create = function(data, cb) {

  data.password = hash(data.password);
  data.datecreated = new Date();
  data.dateModified = new Date();
  data.smallImage = null;
  data.largeImage = null;

  var collection = db.get().collection('user')

  collection.insert(data, function(err, res) {

    if (err)
      return cb({status: 0, error: err});
    
    cb({status: 1, data: res});
  });  

  //db.save(user, cb)
}

exports.get = function(id, cb) {

  var collection = db.get().collection('user')

  collection.findOne({_id: id}, function(err, res) {

    if (err || !res)
      return cb({status: 0, error: err})
    
    cb({status: 1, data: res});
  })

/*
  db.fetch({id:id}, function(err, docs) {
    if (err) return cb(err)
    cb(null, docs[0])
  })
*/
}

exports.findByEmail = function(cb, email) {

    var collection = db.get().collection('user')

    collection.findOne({email: email}, function(err, res) {

      if (err || !res)
        return cb({status: 0, error: err})
      
      cb({status: 1, data: res});
    })
}

exports.authenticate = function(email, password) {

  var collection = db.get().collection('user')

  collection.findOne({email: email}, function(err, res) {

    if (err || !res)
      return cb({status: 0, error: err});

    if (res.password === hash(password))
      return cb({status: 1, data: res})
    
    cb({status: 0, error: "incorrect password"})
  })

/*
  db.fetch({email:email}, function(err, docs) {
    if (err) return cb(err)
    if (docs.length === 0) return cb()

    user = docs[0]

    if (user.password === hash(password)) {
      cb(null, docs[0])
    } else {
      cb()
    }
  })
*/
}

exports.changePassword = function(email, password, cb) {

  var collection = db.get().collection('user')

  collection.update({email: email}, {password: hash(password)}, function(err, affected) {

    if (err) return cb({status: 0, error: err})

    cb({status: 1, affected: affected})
  });

/*
  db.update({id:id}, {password: hash(password)}, function(err, affected) {
    if (err) return cb(err)
    cb(null, affected > 0)
  })
*/
}

