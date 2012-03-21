Multi language extension
========================

This is a small extension for handling sites where the contents have translated fields.

To use it copy lang.js to the extensions folder and select lang.js as the extension for the home section of your website.

Edit the "defaultLang" and the "languages" array in the extension to setup a main language for your site and a series of alternative languages. You currently need to use 2 letter codes for the languages for the extension to work properly.

Making your content multi-language
==================================

In the content panel you need to configure your content to be multi-language. If you have a section with a "title" and a "body" field, you'll want to add translated fields for each language you want to support. A translated field ends with an underscore and the two letter language code. So if you want to translate title and body to Spanish, add the fields title_es and body_es.

Using translations in the templates
===================================

When pulling in content in your templates, you need to specify what fields to translate. Lets imagine you have a section "blog" with entries that have a translated title and body field. This is how you would show an index page for the blog with links to the entries:

    <pop:entries from="blog">
      <h1><a href='<pop:lang:t field="permalink"/>'><pop:lang:t field="title"/></a></h1>
      <pop:lang:t field="body"/>
    </pop:entries>

Note that instead of pulling in the fields directly (`<pop:title/>`, `<pop:body/>`) we use the extension tag to translate the fields: `<pop:lang:t field="field you want to translate"/>`

You can still use the normal tags for fields that doesn't need translation (image fields for example).

Translating non-dynamic content
===============================

Often in your templates you'll need to include some copy that can't be edited by the client, and this also needs translations. The extension will give you tags for each of your languages. Here's an example:

    <pop:lang:en>Show english text</pop:lang:en>
    <pop:lang:es>Mostrar texto en español</pop:lang:es>

Creating the language menu
==========================

The extension will handle navigating from one language to the other. Here's an example of a simple English/Spanish language menu:

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

The `<pop:lang:link lang='es'/>` will return a url to the current content in the specified language.
