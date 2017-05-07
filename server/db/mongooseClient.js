var mongoose = require('mongoose');

var dbstate = {
  client: null
}

exports.connect = function(mongoURL, done) {

	if (dbstate.client) 
		return done();		// already connected

	mongoose.connect(mongoURL);

	var dbconn = mongoose.connection;

	//dbconn.on('error', console.error.bind(console, 'mongoose connection error:'));

	dbconn.on('error',function (err) {  

	  console.log('Mongoose connection error: ' + err);

	  return done(err);
	}); 

	dbconn.once('open', function() {

	  console.log("mongoose connected ok");

	  dbstate.client = dbconn;

	  done();
	});
}