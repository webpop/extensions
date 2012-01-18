<form method="post">
  <pop:form:deliver to="hello@example.com">
    <pop:success>
      <div class="alert-box success">Thank you! We'll get back to you soon.</div>
    </pop:success>
    <pop:error>
      <div class="alert-box error">Oops! Please fill out all the fields.</div>
    </pop:error>
  </pop:form:deliver>

  <p>
      <label for="name">Your Name</label>
      <input required name="name" id="name" class="input-text" value="<pop:form:name/>"/>
  </p>
  <p>
      <label for="email">Your Email</label>
    <input required name="email" id="email" type="email" class="input-text" value="<pop:form:email/>"/>
  </p>
  <p>
      <label for="message">Your Message</label>
      <textarea required name="message" id="message"><pop:form:message/></textarea>
  </p>
  <p>
    <button type="submit" class="medium button">Send »</button>
  </p>
</form>