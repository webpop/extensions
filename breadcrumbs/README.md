Breadcrumb navigation
=====================

This is a small extension for generating breadcrumb navigation.

To use it add nav.js to your extension folder. Then you can access the list of breadcrumbs in your templates like this:

    <ul>
      <pop:nav:breadcrumbs>
        <pop:last>
          <li><span><pop:title/></span></li>
        </pop:last>
        <pop:not_last>
          <li><a href="<pop:permalink/>"><pop:title/></a></li>
        </pop:not_last>
      </pop:nav:breadcrumbs>
    </ul>