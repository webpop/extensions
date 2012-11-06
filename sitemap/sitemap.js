var urlset = function() {
  return {
    urls: site.search({per_page: 9999}).results,
    priority: function(_, _, scope) {
      var depth = scope.permalink == "/" ? 0 : scope.permalink.split("/").length - 1;
      return depth > 10 ? 0 : 1 - depth / 10; 
    }
  }
};

exports.urlset = urlset;

exports.get = {
  "sitemap": function() {
    response.render("sitemap.xml.tpl", {}, {"Content-Type": "text/xml"});
  }
};

