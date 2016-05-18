var mongoose = require('mongoose'),  
     MongoClient = require('mongodb').MongoClient
    , format = require('util').format,
    express = require('express'),
    app = express(),
    path = require("path");

//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

var jade = require('jade');
var fn = jade.renderFile('views/index.jade');
var htmlOutput = fn({
  maintainer: {
    name: 'Olivier Kamanda',
    email: 'olivier.kamanda@pif.gov',
    www: 'http://www.pif.gov'
  }
});
MongoClient.connect('mongodb://okpif:okpif@ds023530.mlab.com:23530/testapidemo', function(err, db) {
    if (err) {return console.error(err);}

    
  // we're connected!
    //console.log(" We're connected to the DB");
        console.log(" We're connected to the DB");
var statecollection = db.collection("states");
  statecollection.count(function(err, count) {
          console.log("There are " + count + " states.");
        });
statecollection.find().toArray(function(err, docs) {
          console.log("Printing docs from Array")
          docs.forEach(function(doc) {
            console.log("Name: "+doc.name);
            console.log("Number: "+doc._id);
            console.log("Abbreviation: "+doc.abbreviation);
            console.log("URL: "+doc.homeurl);  
            
    
            //console.dir(doc);
          });
        });



});