Feed Consumer Extension
=======================

This is a small example of how to fetch the first post from an external RSS feed
and use it in your templates.

To use it just add feed.js to your extensions folder and set the "url" variable to
the url of your RSS feed.

Then use `<pop:feed:first_post>` to use the first post from the feed in your templates.

Example:

    <pop:feed:first_post>
      <h2>
        <a href="<pop:permalink/>"><pop:title/></a>
        <small><pop:published_at format="time_ago_in_words"/> ago</small>
      </h2>
      <pop:description wrap="p"/>
    </pop:feed:first_post>