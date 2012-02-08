/* This is an extension for setting up redirects.
   Note that these paths matches any format, so
   "old-page" will both "/old-page.html" and
   "/old-page"
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