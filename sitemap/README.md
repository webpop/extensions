Sitemap Extension
=================

This extension generates a sitemap.xml dynamically for easy submission to search engines.

1. Copy sitemap.xml.tpl to the templates folder.
2. Copy sitemap.js to the extensions folder.
3. Set the home section to use the sitemap.js extension.

Now visiting http://yourdomain.com/sitemap.xml will list the URLs for the site in [Sitemap XML format](http://http://www.sitemaps.org/).

If the home section is already using another extension, skip step 3 and add the *sitemap* route to the `exports.get` in that extension:

    exports.get = {
      ...,
      "sitemap": function() {
        response.render("sitemap.xml.tpl", {}, {"Content-Type": "text/xml"});
      }
    }


Many thanks to [8legd](https://github.com/8legd/webpop) and [liquidvisual](http://www.liquidvisual.com/) for their suggestions and inspiration.