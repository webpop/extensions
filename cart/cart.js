var mailer = require("mailer"),
    mail   = "test@example.com";


/* Get any items from the cart in the session */
var getItems = function() {
  return request.session.shopping_cart && JSON.parse(request.session.shopping_cart);
};


/* Add an item to the cart in the session */
var addItem= function(options) {
  if (options.id) {
    var items = getItems() || {};

    var cuantity  = items[options.id] ? items[options.id] : 0;
    items[options.id] = cuantity + (options.cuantity || 1);
    request.session.shopping_cart = JSON.stringify(items);
  }
};


/*
 * <pop:cart:items>
 * Returns a list of items
 * Adds a "cuantity" attribute to each item
 */
exports.items = function() {
  var items = getItems();
  var result = [];  
  if (items) {
    for(var id in items) {
      var item = site.content({from: id});
      item.cuantity = items[id];
      result.push(item);
    }
  }
  return result;
};


/*
 * <pop:cart:add_item_action/>
 * Returns the form action to be used when adding items to the cart.
 */
exports.add_item_action = function(options, enclosed, scope) {
  return section && section.permalink + "/add/" + (scope.id || options.id);
};


/*
 * <pop:cart:checkout_link/>
 * Returns the url to the checkout.
 */
exports.checkout_link = function(options) {
  return section && section.permalink + "/checkout";
};


exports.get = {
  /* Checkout confirmation screen - renders the cart/checkout template */
  "checkout": function(params) {
    response.render("cart/checkout", {items: exports.items(), confirmed: false});
  }
};

exports.post = {
  /* Add an item and redirect back to the section */
  "add/:id": function(params) {
    var content = site.content({from: params.id});
    addItem(params);

    response.send("Product added", {Location: section.permalink}, 302);
  },

  /* Process the items and deliver the order in a mail. */
  "checkout": function(params) {
    var items = exports.items();

    var message = ["New order from " + params.name, "", "Items: "];
    for (var i in items) {
      message.push("" + items[i].cuantity + ": " + items[i].title);
    };
    message.push("\nName: " + params.name + "\nEmail: " + params.email + "\nAddress: " + params.address);
    mailer.send(mail, "New Order", message.join('\n'));

    request.session.shopping_cart = null;

    response.render("cart/checkout", {items: items, confirmed: true});
  }
};
