<pop:auth:authenticated>
  <h1>This can only be seen by authenticated users</h1>

  <form method="post">
    <input type="hidden" name="logout" value="logout"/>
    <button type="submit">Log out</button>
  </form>
</pop:auth:authenticated>
<pop:auth:not_authenticated>
  <form method="post">
    <pop:auth:authenticate>
      <pop:error>
        <div class="error">Bad username or password.</div>
      </pop:error>
      <pop:success>
        <pop:redirect to="/"/>
      </pop:success>
    </pop:auth:authenticate>
    <p>
      <label for="username">Username</label>
      <input id="username" name="username"/>
    </p>
    <p>
      <label for="password">Password</label>
      <input type="password" id="password" name="password"/>
    </p>
    <p>
      <button type="submit">Log in</button>
    </p>
  </form>
</pop:auth:not_authenticated>