var mongoose = require('mongoose');

var state = {
  db: null,
}

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
});

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

exports.connect = function(url, done) {

	if (state.db) return done();		// already connected

	mongoose.connect(url);

	var db = mongoose.connection;

	db.on('error', console.error.bind(console, 'mongoose connection error:'));

	db.once('open', function() {

	  // we're connected!

	  console.log("mongoose connected ok");

	  state.db = db

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


	  done();
	});
}