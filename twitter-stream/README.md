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

Autolinking Tweets
==================

Twitter has a good client side library for autolinking tweets here: 

https://raw.github.com/twitter/twitter-text-js/master/twitter-text.js

Add this javascript to your public folder as javascripts/twitter-text.js

Then at the bottom of your main layout include the script and a small hook:

    <script src="/javascripts/twitter-text.js"></script>
    <script>
      $(function(){
        $(".tweet-text").each(function() {
          var el = $(this);
          el.html(twttr.txt.autoLink(el.text()));
        });
      });
    </script>

This assumes you're using jquery and that the tweet text is in an element with
the class called .tweet-text.