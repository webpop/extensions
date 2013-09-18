/* This is an extension for setting up redirects.
   These paths will match any format. So a redirect for "old-page"
   will handle visits to "/old-page.html" as well as "/old-page"
*/

exports.get = {
  "old-page": redirectTo("new-page"),
  "another/old-page": redirectTo("another-new-page"),
  "temporary": redirectTo("placeholder-page", 302)
};

function redirectTo(path, status) {
  return function() {
    response.send("Redirecting to " + path, {Location: path}, status || 301);
  };
};
