var client_id     = YOUR_INSTAGRAM_CLIENT_ID;
var client_secret = YOUR_INSTAGRAM_CLIENT_SECRET;

var storage = require("storage"),
    file    = require("file"),
    http    = require("http");

var api     = "https://api.instagram.com/";
var version = "1.0";

var redirectUrl = file.join(section.url, "instagram/response");

exports.recent = function() {
  var token = storage.get("instagram_access_token");
  if (token) {
    var feed = http.get(api + "/v1//users/self/media/recent?access_token=" + token);
    return feed.data;
  }
}

exports.feed = function() {
  var token = storage.get("instagram_access_token");
  if (token) {
    var feed = http.get(api + "/v1/users/self/feed?access_token=" + token);
    return feed.data;
  }
};
    
exports.get = {
  "instagram/authorize": function() {
    var url = api + "oauth/authorize/?client_id=" + client_id + "&redirect_uri=" + redirectUrl + "&response_type=code";
    response.send("Redirecting to instagram", {Location: url}, 302);
  },
  "instagram/response": function(params) {
    var resp = params.code && http.request({
      url: api + "oauth/access_token",
      type: "post",
      data: {
        client_id: client_id,
        client_secret: client_secret,
        grant_type: 'authorization_code',
        redirect_uri: redirectUrl,
        code: params.code
      }
    });
    
    if (resp && resp.success) {
      var json = JSON.parse(resp.body);
      
      if (json.access_token) {
        storage.put("instagram_access_token", json.access_token);
        response.send("Access Token Stored - you can now use <pop:instagram:feed>...</pop:instagram:feed> in your templates");
      } else {
        response.send("Something went wrong - here's the response: "+JSON.stringify(resp));
      }
    } else {
      response.send("No token :(");
    }
  },
  "instagram/reset": function(params) {
    if (request.user) {
      storage.put("instagram_access_token", null);
      response.send("Access Token Deleted");
    } else {
      response.send("Redirecting to login", {Location: "/admin"}, 303);
    }
  }
}