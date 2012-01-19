var xml  = require("xml"),
    http = require("http"),
    url  = "http://www.webpop.com/blog.rss";

exports.first_post = function() {
  var body = http.get(url),
      post = xml.parse(body).find("item")[0];
  
  return {
    title: post.find("title").text(),
    description:  post.find("description").text(),
    permalink: post.find("link").text(),
    published_at: post.find("pubDate").text()
  };
};