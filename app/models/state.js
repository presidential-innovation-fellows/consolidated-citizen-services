var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var StateSchema   = new Schema({
    num: Number,
    date : {type: Date, default: Date.now},
    name: String,
    abbreviation: {type: String, max:2},
    homeurl: String,
    language: String,
    usesmicrodata: Boolean,
    usesogp: Boolean,
    usesrdf: Boolean,
    usesxml: Boolean,
    consumerprotectionurl: String,
    correctionsurl: String,
    bankingurl: String,
    votingurl: String,
    pscurl: String,
    mvadmvurl: String
    
});

module.exports = mongoose.model('State', StateSchema);