var mongoose = require('mongoose'),  
     MongoClient = require('mongodb').MongoClient
    , format = require('util').format,
    express = require('express'),
    app = express(),
    path = require("path");

var pug = require('pug');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// New Code
var mongo = require('mongodb');

var statecount;
var statelist;
var ogptrues;
var rdftrues;
var xmltrues;

var ogptrues_count;
var rdftrues_count;
var xmltrues_count;

var message = "";


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, '/public')));


/*
var fn = pug.renderFile('views/index.pug');
var htmlOutput = fn({
  maintainer: {
    name: 'Olivier Kamanda',
    email: 'olivier.kamanda@pif.gov',
    www: 'http://www.pif.gov'
  }
});*/



MongoClient.connect('mongodb://okpif:okpif@ds023530.mlab.com:23530/testapidemo', function(err, db) {
    if (err) {return console.error(err);}

    
  // we're connected!
    //console.log(" We're connected to the DB");
        console.log(" We're connected to the DB");
app.get ('/', function (req,res) {
    
    
    

var statecollection = db.collection("states");
 

    statecollection.count( function(err, cnt) {
       if (err) 
       {
           return console.error(err);
       }
        else
        {
            statecount = cnt;
            console.log("There are " + cnt + " states.");

                    //res.render('index.pug', {maintainer: {name: 'Olivier Kamanda', email: 'olivier.kamanda@pif.gov', www:'http://www.pif.gov', count: statecount}});

        }
    
});
    
message = message + "There are " + statecount+ " states.";

    //find states that use open graph
    statecollection.find({usesogp: 1}).toArray(function(err,docs){
          if (err) 
       {
           return console.error(err);
       }
        else {
            ogptrues = docs;
            ogptrues_count = docs.length;
            docs.forEach(function(doc) {
                console.log("OGP name "+ doc.name);
                
                
            });
        } 
        
    }); //close opengraph function
    
    //find states that use RDF
    statecollection.find({usesrdf: 1}).toArray(function(err,docs){
          if (err) 
       {
           return console.error(err);
       }
        else {
            
            rdftrues_count = docs.length;
            
        } 
        
    }); //close rdf count function
    
       //find states that use XML
    statecollection.find({usesxml: 1}).toArray(function(err,docs){
          if (err) 
       {
           return console.error(err);
       }
        else {
            
            xmltrues_count = docs.length;
            
        } 
        
    }); //close XML count function

    //find all documents
    statecollection.find().toArray(function(err, docs) {
          console.log("Printing docs from Array")
        statelist = docs;
          res.render('index.pug', {values: ogptrues,ogptrues_count: ogptrues_count,rdftrues_count: rdftrues_count,xmltrues_count: xmltrues_count, states: statelist,count: statecount, maintainer: {name: 'Olivier Kamanda', email: 'olivier.kamanda@pif.gov', www:'http://www.pif.gov'}});
        
          docs.forEach(function(doc) {
            console.log("Name: "+doc.name);
            //console.log("Number: "+doc._id);
            //console.log("Abbreviation: "+doc.abbreviation);
            //console.log("URL: "+doc.homeurl);  
            
            message = message + "Name: "+doc.name;
            message = message + "Number: "+doc._id;
            message = message + "Abbreviation: "+doc.abbreviation;
            message = message + "URL: "+doc.homeurl;  
            
    
            //console.dir(doc);
          });
        });

    //res.send(message);
    
});


});
app.listen(3000);