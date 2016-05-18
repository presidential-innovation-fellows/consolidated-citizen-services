var template = require('views/template-main.js');  
var mongo_data = require('mongoose1.js');  



exports.get = function(req, res) {  
  var stateName = "h";
  mongo_data.statelist(stateName, function(err, statelist) {
    if (!err) {
      var stateSomething = "",
        i = 0,
        stateCount = statelist.length;
      for (i = 0; i < stateCount;) {
        stateSomething = stateSomething + "<li>" + statelist[i].num + "</li>";
        i = i + 1;
      }
      stateSomething = "<ul>" + stateSomething + "</ul>"
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.write(template.build("Test web page on node.js", "Hello there", "<p>The teams in Group " + stateName + " for Euro 2012 are:</p>" + strTeam));
      res.end();
    } else {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.write(template.build("Oh dear", "Database error", "<p>Error details: " + err + "</p>"));
      res.end();
    }
  });
};