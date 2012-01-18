var http = require('http');

exports.timeline = function(options) {
  var url = "http://api.twitter.com/1/statuses/user_timeline.json?screen_name=" + options.screen_name;
 
  return http.get(url);
};