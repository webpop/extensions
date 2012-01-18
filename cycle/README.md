Cycle Extension
===============

The cycle extension is not meant for bike riders, but for
cycling through values in a list.

Useful for zebra-striped tables or the like.

Typical use:

    <pop:entries wrap="ul">
      <li class="<pop:list:cycle/>"><pop:title/></li>
    </pop:entries>

Will output a ul where the li's cycle through the class names "odd" and "even",
example output:

    <ul>
      <li class="odd">Entry one</li>
      <li class="even">Entry two</li>
      <li class="odd">Entry three</li>
    </ul>

If you don't like "odd" and "even" you can specify the values as a comma separated list:

    <pop:entries wrap="ul">
      <li class="<pop:list:cycle values='red, blue, green'/>"><pop:title/></li>
    </pop:entries>

Example output:

    <ul>
      <li class="red">Entry one</li>
      <li class="blue">Entry two</li>
      <li class="green">Entry three</li>
    </ul>

You can also use different cycle groups with their own internal counter and their own values:

    <pop:entries>
      <div class="row">
        <div class="columns <pop:list:cycle group='body' values='seven, four'/>">
          <pop:body/>
        </div>
        <div class="columns <pop:list:cycle group='image' values='five, eight'/>">
          <pop:image/>
        </div>
      </div>
    </pop:entries>

If you have several lists using cycle on the same page, you should always give each cycle its own
group.