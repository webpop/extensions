Instagram Feed Extension
========================

This extension will let you use your Instagram feed in your templates.

The Instagram API uses OAuth2 for authentication and it requires you to authenticate before you can use the feed. This makes setting up the extension a bit more demanding than other extensions.

1. Add instagram.js to your Extensions folder
2. Set instagram.js as the extension for your home section. This is just temporary and you can remove it after you have authenticated.
3. Register an application with Instagram http://instagram.com/developer/client/register/
  * For the website, use the *url of your Webpop* site (it's ok if it's the development url)
  * For the redirect URI use the *url of your site + /instagram/response*, ie. if your site is example-web.yourwebisonline.com, the redirect URI will be: http://example-web.yourwebisonline.com/instagram/response
4. Instagram will give you a *client id* and a *client secret* for your app. Go to *instagram.js* in Extensions and enter these at the top.
5. Now go to the */instagram/authorize* url of your site. If you've completed the last steps right you should not get a prompt to authorize your app.
6. You are now ready to use the extension. After the setup the extension doesn't need to be associated to your home section, so you can remove it there.

Once you've gone through these steps you can use the `<pop:instagram:feed>` tag to access your Instagram feed from your templates.

See the *example.tpl* file for a basic example. You can access any of the values the users endpoint in the Instagram API returns.

Check here to see an example response: http://instagr.am/developer/endpoints/users/#get_users_feed