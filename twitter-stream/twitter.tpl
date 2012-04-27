<!DOCTYPE html>
<html>
  <head>
    <title>My Tweets</title>
  </head>
  <body>
    <h1>My Tweets</h1>
    <pop:twitter:timeline screen_name="webpop" wrap="ul" break="li">
      <pop:text wrap="div" class="tweet-text"/>
      <a href="http://twitter.com/#!/webpop/status/<pop:id_str />"><pop:created_at format="time_ago_in_words"/> ago</a>
    </pop:twitter:timeline>
  </body>
</html>