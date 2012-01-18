Twitter Timeline Example
========================

This is a very simplistic example of using the http module to fetch
the timeline for a twitter user.

The http.get method will automatically parse context with the content-type
"application/json". In this case we parse the resulting javascript array
directly to the template.

The keys from the json can be used as tags in the template. For an idea of the
keys you can use, take a look at the Webpop timeline as the Twitter api displays
it: http://api.twitter.com/1/statuses/user_timeline.json?screen_name=webpop