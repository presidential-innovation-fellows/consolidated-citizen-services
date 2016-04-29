// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var State     = require('./app/models/state.js');

var mongoose   = require('mongoose');
//mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o'); 
mongoose.connect('mongodb://okpif:okpif@ds023530.mlab.com:23530/testapidemo'); 
 

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'This is the Consolidated Citizen Services State API' });   
});



// more routes for our API will happen here


// on routes that end in /states/:state_id
router.route('/states')

    // create a state (accessed at POST http://localhost:8080/api/states)
    .post(function(req, res) {
        
        var state = new State();      // create a new instance of the state model
    
        state._id = req.body._id,  // set the states name (comes from the request)
        state.name = req.body.name,  // set the states name (comes from the request)
        state.abbreviation = req.body.abbreviation,
        state.homeurl = req.body.homeurl,
        state.language = req.body.language,
        state.usesmicrodata = req.body.usesmicrodata,
        state.usesogp = req.body.usesogp,
        state.usesrdf = req.body.usesrdf,
        state.usesxml = req.body.usesxml,
        state.consumerprotectionurl = req.body.consumerprotectionurl,
        state.correctionsurl = req.body.correctionsurl,
        state.bankingurl = req.body.bankingurl,
        state.votingurl = req.body.votingurl,
        state.pscurl = req.body.pscurl,
        state.mvadmvurl = req.body.mvadmvurl

        // save the state and check for errors
        state.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'state created!' });
        });
        
    })   // get all the states (accessed at GET http://localhost:8080/api/states)
    .get(function(req, res) {
        State.find(function(err, states) {
            if (err)
                res.send(err);

            res.json(states);
        });
    });

// ----------------------------------------------------
router.route('/states/:state_id')

    // get the state with that id (accessed at GET http://localhost:8080/api/states/:state_id)
    .get(function(req, res) {
        State.findById(req.params.state_id, function(err, state) {
            if (err)
                res.send(err);
            res.json(state);
        });
    })
    .put(function(req, res) {

        // use our state model to find the state we want
        State.findById(req.params.state_id, function(err, state) {

            if (err)
                res.send('Error: '+err);
            //state._id = req.body._id,  // set the states name (comes from the request)
            state.name = req.body.name,  // update the states info
            state.abbreviation = req.body.abbreviation,
            state.homeurl = req.body.homeurl,
            state.language = req.body.language,
            state.usesmicrodata = req.body.usesmicrodata,
            state.usesogp = req.body.usesogp,
            state.usesrdf = req.body.usesrdf,
            state.usesxml = req.body.usesxml,   
            state.consumerprotectionurl = req.body.consumerprotectionurl,
            state.correctionsurl = req.body.correctionsurl,
            state.bankingurl = req.body.bankingurl,
            state.votingurl = req.body.votingurl,
            state.pscurl = req.body.pscurl,
            state.mvadmvurl = req.body.mvadmvurl
            
                
            // save the state
            state.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'state updated!' });
            });

        });
    })
 .delete(function(req, res) {
        State.remove({
            _id: req.params.state_id
        }, function(err, state) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);