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
var microtrues;
var languages;
var spanish;
var olvr;
var olrc;


var ogptrues_count;
var rdftrues_count;
var microtrues_count;
var languages_count;
var spanish_count;
var olvr_count;
var olrc_count;

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
    
    
    

var statecollection = db.collection("stateinfo");
 

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

    //find states that offer spanish
    statecollection.find({language: 1}).toArray(function(err,docs){
          if (err) 
       {
           return console.error(err);
       }
        else {
            spanish = docs;
            spanish_count = docs.length;
            
        } 
        
    }); //close spanish function
    
     //find states that offer multiple transliation
    statecollection.find({language: {$gte: 2}}).toArray(function(err,docs){
          if (err) 
       {
           return console.error(err);
       }
        else {
            languages = docs;
            languages_count = docs.length;
            
        } 
        
    }); //close multitranslate function
    
       //find states that offer online voter registration
    statecollection.find({olvr: 1}).toArray(function(err,docs){
          if (err) 
       {
           return console.error(err);
       }
        else {
            olvr = docs;
            olvr_count = docs.length;
            
        } 
        
    }); //close online voter registration function
    
    //find states that offer online registration check
    statecollection.find({olrc: 1}).toArray(function(err,docs){
          if (err) 
       {
           return console.error(err);
       }
        else {
            olrc = docs;
            olrc_count = docs.length;
            
        } 
        
    }); //close online registration check
    
    
    
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
    
       //find states that use microdata
    statecollection.find({usesmicrodata: {$gte: 1}}).toArray(function(err,docs){
          if (err) 
       {
           return console.error(err);
       }
        else {
            
            microtrues_count = docs.length;
            
        } 
        
    }); //close Microdata count function

    //find all documents
    statecollection.find().toArray(function(err, docs) {
          console.log("Printing docs from Array")
        statelist = docs;
          res.render('index.pug', {values: ogptrues,ogptrues_count: ogptrues_count,rdftrues_count: rdftrues_count,microtrues_count: microtrues_count,spanish_count: spanish_count, languages_count: languages_count, olvr_count: olvr_count, olrc_count:olrc_count, states: statelist,count: statecount, maintainer: {name: 'Olivier Kamanda', email: 'olivier.kamanda@pif.gov', www:'http://www.pif.gov'}});
        
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
//app.listen(process.env.PORT ||3000);
app.listen(process.env.VCAP_APP_PORT || 3000);