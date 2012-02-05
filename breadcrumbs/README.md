Breadcrumb navigation
=====================

This is a small extension for generating breadcrumb navigation.

To use it add nav.js to your extension folder. Then you can access the list of breadcrumbs in your templates like this:

    <ul>
      <pop:nav:breadcrumbs>
        <pop:current>
          <li><span><pop:title/></span></li>
        </pop:current>
        <pop:not_current>
          <li><a href="<pop:permalink/>"><pop:title/></a></li>
        </pop:not_current>
      </pop:nav:breadcrumbs>
    </ul>