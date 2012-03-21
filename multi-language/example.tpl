<h1>Using the multi language extension</h1>

<h2>Using translated fields</h2>

<pop:entries from="blog">
  <h3><a href='<pop:lang:t field="permalink"/>'><pop:lang:t field="title"/></a></h3>
  <pop:lang:t field="body"/>
</pop:entries>

<h2>Showing different texts based on language</h2>

<pop:lang:en>Show english text</pop:lang:en>
<pop:lang:es>Mostrar texto en español</pop:lang:es>

<h2>Language selector</h2>

<div> 
  <h3><pop:lang:en default="idiomas">languages</pop:lang:en></h3> 
  <ul> 
    <li> 
      <a href="<pop:lang:link lang='es'/>" class="<pop:lang:es>active</pop:lang:es>">Español</a> 
    </li> 
    <li> 
      <a href="<pop:lang:link lang='en'/>" class="<pop:lang:en>active</pop:lang:en>">English</a> 
    </li> 
  </ul> 
</div>

<h2>Translating dates</h2>

<p>This is a built-in functionality for all date fields. If you're using this extension you'll want to know about it</p>

<pop:content>
  <pop:published_at format="time_ago_in_words" lang="<pop:lang:current />" />
</pop:content>