A/B Testing Extension
=====================

Use this extension to optimize your site by testing different versions of your sites design and content, and analyzing the effect it has on your visitors behavior by measuring specific actions they take.

It uses [chi-squared test](http://en.wikipedia.org/wiki/Chi-squared_test) to calculate the statistical probability of a variation actually being the winner.

How to Make a Test
==================

1. Add ab.coffee to your extensions folder. Save it so it compiles to ab.js.

2. Add the markup from test.tpl in your template where you want to make a test.

3. Customize the markup to fit your needs, change the name of the test if you like, eg. `<pop:ab:test name="my-first-test">` and include at least two variations. In test.tpl the two variations are named "`<pop:champion>`" and "`<pop:contender>`" but you can use any name that doesn't conflict with a Pop Tag. The extension will pick the contents of one of the variation tags to show at random to site visitors.

4. Create a goal for your test by adding `<pop:ab:goal name="example-test"/>` to the page which visitors will see after they have taken the action you are trying to optimize for. A typical place to put it would be in the confirmation message after a form submission.

5. Upload results.tpl to your templates, create a section called "AB Results" and assign it to results.tpl. Make sure that `<pop:variations>` has your tests name, eg `<pop:variations name="my-first-test">`.

6. Now your test should be up and running, everytime someone gets to the page with the `<pop:ab:goal name="my-first-test">` tag, a win is logged for the variation which they saw. A win is only logged once per session.

7. Verify that all your variations are displaying correctly by appending "?ab=champion" or "?ab=contender" (or whatever you chose to name your variations) to the end to the url of the page which you are running the test. You should see the corresponding markup on the page.

8. Visit your results page, you should start seeing wins and a statistical analysis of your tests displayed here once people start hitting the goal. And now you just have to sit back and wait. It's best to let at least 10 wins acrue for each variation before concluding a winner for a test.
