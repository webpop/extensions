<pop:ab:test name="example-test">
  <pop:champion>Fill out this form.</pop:champion>
  <pop:contender>You should really fill out this form. It'll bring you massive success!</pop:contender>
</pop:ab:test>

<pop:form name="whoop">

  <pop:success>
    <h1>Thanks!</h1> <pop:ab:goal name="example-test"/>
  </pop:success>

  <p>
    <label>Name: <input name="name"/></label>
  </p>
  <p>
    <label>Email: <input name="email"/></label>
  </p>
  <p>
    <button>Submit</button>
  </p>
</pop:form>