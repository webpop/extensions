<h1>Upcoming events:</h1>

<pop:content>
  <pop:events wrap="div" class="events">
    <h2><a href="<pop:permalink/>"><pop:title/></a></h2>
    <p><pop:date format="dd-mm-yyyy"/></p>
  </pop:events>
</pop:content>

<!-- List of weeks with number of events: -->
<nav>
  <pop:content>
    <pop:weeks wrap="ul" break="li" class="weeks">        
      <a href="<pop:week_link start='<pop:start/>'/>"><strong><pop:start format="ddd dd-mm-yyyy"/> - <pop:end format="ddd dd-mm-yyyy"/></strong>: <pop:count/></a>
    </pop:weeks>
  </pop:content>  
</nav>