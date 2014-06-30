## Recaptcha Extension

This extension will let you add a captcha from [Recaptcha](https://www.google.com/recaptcha/intro/index.html) to your `<pop:form>`.

## Installation

Add recaptcha.js to your extensions directory and configure your own public and private keys at the top of the file.

The change your pop:form to add `validator="recaptcha"` and include the captcha in the form using the extensions captcha tag, `<pop:recaptcha:captcha/>`.

## Example

```html
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
  <pop:error.captcha wrap="p" class="error">Error validating your captcha</pop:error>
  <p>
    <button type="submit">Send</button>
  </p>
</pop:form>
```
