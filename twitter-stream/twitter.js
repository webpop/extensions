var http = require('http');

exports.timeline = function(options) {
  var url = "http://api.twitter.com/1/statuses/user_timeline.json";
 
  return http.get(url, {
    data: {screen_name: options.screen_name}
  });
};