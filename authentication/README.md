Simple Authentication
=====================

This is a very basic example of how to set up an authentication system based on one username/password.

To use: add auth.js to your extension and set the username and password at the top of the file. If you have a single page requiring authentication you can do something like this:

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

Another option is to add a separate page for the login form and redirect there when not authenticated.