<pop:user>
  <pop:stripe:needs_configuration>

  <pop:stripe:configure><pop:redirect to="/"/></pop:stripe:configure>

    <h1>You need to configure stripe</h1>

    <h2>Please fill in your Stripe
      <strong>
        <pop:production>production</pop:production>
        <pop:development>development</pop:development>
      </strong>
      credentials
    </h2>
    <p>
      Need a stripe account? <a href="https://manage.stripe.com/register">Get one here.</a>
    </p>

    <form method="post">
      <p>
        <label>Your stripe secret key</label>
        <input type="text" name="secret_key"/>
      </p>
      <p>
        <label>Your stripe public key</label>
        <input type="text" name="public_key"/>
      </p>
      <p>
        <button class="button">Submit</button>
      </p>
    </form>

  </pop:stripe:needs_configuration>
</pop:user>

