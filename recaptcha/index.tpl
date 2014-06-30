<pop:form name="contact" validator="recaptcha">
  <pop:success><h2>Thank you!</h2></pop:success>
  <pop:error><h2>Error validating the form.</h2></pop:error>
  <p>
    <label>Email: <input name="email"/></label>
  </p>
  <p>
    <label>Message: <textarea name="message"></textarea></label>
  </p>
  <p>
    <pop:recaptcha:captcha/>
  </p>
  <pop:error.captcha wrap="p" class="error">Error validating your captcha</pop:error.captcha>
  <p>
    <button type="submit">Send</button>
  </p>
</pop:form>
