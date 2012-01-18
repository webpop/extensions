Archive Extension
=================

This extension can be used to add the typical archive to your blog (or any other section with entries).

Add archive.js to your extensions folder and set the section that should have an archive to use this extension.

Once the section has been extended, you can access the archive in the template:

    <pop:content from="blog">
      <pop:archive wrap="ul">
        <li>
          <a href="<pop:permalink/>">
            <pop:start format="mmmm yyyy"/> (<pop:count/>)
          </a>
        </li>      
      </pop:archive>
    </pop:content>

This will give you a list of months with the number of entries for each month.

You also need to add an archive.tpl template in the same folder where the section's main template is stored.

In this template `<pop:content>` will be the current month. Inside `<pop:content>` you can use `<pop:date/>` to
display the month and `<pop:entries>` to list the entries published during that month.

    <pop:content>
      <h1>Stories from <pop:date format="mmmm yyyy"/></h1>
      <pop:entries>
        <h2><a href="<pop:permalink/>"><pop:title/></a></h2>
      </pop:entries>
    </pop:content>