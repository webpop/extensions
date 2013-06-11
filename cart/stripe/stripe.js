var http    = require("http"),
    storage = require("storage");

var url    = "https://api.stripe.com/v1/charges";

/*
* Get the Stripe credentials and cache them for future use
* Do this once for the development URL and once for production.
*/
var credentials = function() {
  if (this.credentials) { return this.credentials; }
  this.credentials = storage.get("stripe-" + (request.isDevelopment ? "dev" : "prod") + "-credentials");
  return this.credentials;
};


/*
* <pop:stripe:public_key>
* Outputs the Stripe public key
*/
exports.public_key = function() {
  var keys = credentials();
  return keys.public_key;
};


/*
* Use <pop:stripe:needs_configuration> to render the configuration
* if Stripe has not been setup yet.
*/
exports.needs_configuration = function() {
  return credentials() == null;
};


/*
* <pop:stripe:configure> stores the Stripe keys when the configuration form is submitted
* and will evaluate it's contents at the time as well, so you can put <pop:redirect to="/"/>
* inside of <pop:stripe:configure> to redirect users back to the home page
* once they've configured Stripe.
*/
exports.configure = function() {
  if (request.request_method == "POST" && request.params.secret_key && request.params.public_key) {
    storage.put("stripe-" + (request.isDevelopment ? "dev" : "prod") + "-credentials", {
      public_key: request.params.public_key,
      secret_key: request.params.secret_key
    });
    return true;
  }
}


/*
* <pop:stripe:charge>
* Attempt to charge the credit card with the amount of the order using the single use token
* received from submitting the credit card info to Stripe.
*/
exports.charge = function(options, enclosed, scope) {
  if (request.request_method === "POST") {
    var token = request.params.stripeToken;

    var response = http.request({
      url: url,
      type: "POST",
      username: credentials().secret_key,
      data: {
        amount: options.amount,
        currency: options.currency || "USD",
        card: token,
        description: options.description || ""
      }
    });

    var id = JSON.parse(response.body).id;

    if (response.status == 200) {
      return {success: true, stripe_id: id}
    } else {
      return {error: response.body}
    }
  }
};

