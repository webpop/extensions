Google Experiments Extension
============================

This extension uses the Google Analytics Experiments API to test different variations of your templates.

First go to you Google Analytics account and set up an experiment.
It will ask for a set of urls to be your variations. For this exension to work, you should use the query parameters "?ab="

E.g. You'd set an experiment for the Webpop homepage with these two urls:

http://www.webpop.com

http://www.webpop.com?ab=b

Once you've created your experiment, add this configuration tag to your layout, just inside of your `<head>` tag:

```
<pop:google_ab:experiment_code key="[EXPERIMENT CODE GOES HERE]" cookie_domain="[YOUR DOMAIN GOES HERE, eg. example.com ]" path="/"/>
```

After you've added your Google experiment code and specified a domain and path, the script will be active and start randomly appending test query parameters to peoples url bar when they visit your site.

Next you need to define some variations in your templates to respond to the query parameter set by the script.

```
<pop:google_ab:original>
  <h1>A compelling Headline<h1>
</pop:google_ab:original>

<pop:google_ab:variation name="b">
  <h1>A hopefully even more compelling headline<h1>
</pop:google_ab:variation>
```

You can define multiple variations, just add different names.

You can also have a variation in multiple parts of a template, the extensions will always render whatever is inside the variation tag that matches the current url.


Set up some goals
=================

The best way to do an experiment is usually to create a specific goal you want to achieve, and often that involves some sort of user action, set up [event tracking](https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide#SettingUpEventTracking) to setup goals around specific events.


