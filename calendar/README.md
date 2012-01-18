Calendar Extension
==================

This is a simple calendar extension using Webpop's search API to list events.

To use the extension create a Section with entries enabled and configure the entries to have a "date" field.

Add calendar.js to your extensions folder and set the calendar section to use this extension.

In the template used to display the calendar section, you can list all future events like this:

    <pop:content>
      <pop:events wrap="div" class="events">
        <h2><pop:title/></h2>
        <p><pop:date format="dd-mm-yyyy"/></p>
      </pop:events>
    </pop:content>

You can get a list of weeks with the number of events for each week like this:

    <pop:content>
      <pop:weeks wrap="ul" break="li" class="weeks">        
        <a href="<pop:week_link start='<pop:start/>'/>"><strong><pop:start format="ddd dd-mm-yyyy"/> - <pop:end format="ddd dd-mm-yyyy"/></strong>: <pop:count/></a>
      </pop:weeks>
    </pop:content>

When displaying a week the extension will look for a template called "events.tpl". From within that template you can use the same snippets as above to access the events from that week or to access the list of weeks.