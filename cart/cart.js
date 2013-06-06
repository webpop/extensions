var mailer = require("mailer"),
    mail   = "store@webpop.com";

/* Utilities */
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


/* Get any items from the cart in the session */
var getItems = function() {
  return request.session.shopping_cart && JSON.parse(request.session.shopping_cart);
};

/* Add an item to the cart in the session */
var addItem = function(options) {
  if (options.id) {
    var items = getItems() || {},
        curQuantity  = items[options.id] ? items[options.id] : 0,
        quantity     = parseInt(options.quantity || 1, 10);

    if (quantity < 1) return;

    items[options.id] = curQuantity + quantity;
    request.session.shopping_cart = JSON.stringify(items);
  }
};

/* Update an item in the cart */
var updateItem = function(options) {
  if (options.id) {
    var items = getItems() || {},
        quantity = parseInt(options.quantity || 1, 10);

    if (quantity < 0) return;
    
    if (quantity == 0) {
      delete items[options.id]
    } else {
      items[options.id] = quantity;
    }
    
    request.session.shopping_cart = JSON.stringify(items);
  }
};


/*
 * <pop:cart:items>
 * Returns a list of items
 * Adds a "quantity" attribute to each item
 */
exports.items = function() {
  var items = getItems();
  var result = [];
  if (items) {
    for(var id in items) {
      var item = site.content({from: id});
      if (item == null) continue;
      item.quantity = parseInt(items[id], 10);
      var price = item.price && parseFloat(item.price.replace(/,/g, ''));
      var total = price && item.quantity * price;
      item.total = numberWithCommas(total);
      result.push(item);
    }
  }
  return result;
};


/*
 * <pop:cart:item_count/>
 * Returns the total number of items in the cart.
 */
exports.item_count = function() {
  var items    = getItems(),
      quantity = 0;
  for (var key in items) {
    quantity += parseInt(items[key], 10);
  };
  return numberWithCommas(quantity);
};


/*
 * <pop:cart:total/>
 * Returns the sums of all the items by price.
 */
exports.total = function() {
  var total = 0;
  var items = exports.items();
  if (items) {
    items.forEach(function(item) {
      var price = parseFloat(item.price.replace(/,/g, ''));
      if (price) { total += price*item.quantity; }
    });
  }
  return numberWithCommas(total);
}


/*
 * <pop:cart:add_item_action/>
 * Returns the form action to be used when adding items to the cart.
 */
exports.add_item_action = function(options, enclosed, scope) {
  return  "/cart/add/" + (options.id || scope.id);
};

exports.update_item_action = function(options, enclosed, scope) {
  return  "/cart/update/" + (options.id || scope.id);
};


/*
 * <pop:cart:checkout_link/>
 * Returns the url to the checkout page.
 */
exports.checkout_link = function(options) {
  return "/cart/checkout";
};


/* 
 * <pop:cart:message/>
 * Display a message from the session, eg. "Product Added".
 */
exports.message = function() {
  if (request.session.flash_message) {
    var msg = request.session.flash_message;
    request.session.flash_message = null;
    return msg;
  }
}


/* Respond to these custom urls */
exports.routes = {
  get: {
    "checkout": function(params) {
      response.render("cart/checkout", {title: "Checkout", items: exports.items(), confirmed: false});
    }
  },
  post: {
    /* Add an item to the cart */
    "add/:id": function(params) {
      var content = site.content({from: params.id});
      addItem(params);
      request.session.flash_message = "Product has been added to cart";
      
      response.send("Product added", {Location: content.permalink || '/'}, 302);
    },

    
    /* Update the quantity of an item in the cart */
    "update/:id" : function(params) {
      var content = site.content({from: params.id});
      updateItem(params);
      if (params.quantity > 0) {
          request.session.flash_message = "Product quantity updated";
      } else if (params.quantity == 0) {
        request.session.flash_message = "Product has been removed from cart";
      }
      
      response.send("Product updated", {Location: "/cart/checkout"}, 302);
    },

    /* Process the items and deliver the order in a mail. */
    "checkout": function(params) {
      var name = params.first_name + " " + params.last_name;
      var message = ["New order from " + name, "", "Items: "];
      var customer_message =["Thank you for your order " + params.first_name, "", "Items: "];
      var items = exports.items();
      
      for (var i in items) {
        message.push("" + items[i].quantity + ": " + items[i].title);
        customer_message.push("" + items[i].quantity + ": " + items[i].title);
      };
      
      message.push("\nName: " + name + "\nEmail: " + params.email + "\nAddress: " + params.address);
      customer_message.push("\nTotal: $" + exports.total(),"\nName: " + name + "\nEmail: " + params.email + "\nAddress: " + params.address,"", "Please contact us if you have any questions.");

      mailer.send(mail, "New Order", message.join('\n'));      
      mailer.send(params.email, "Thank you for your order.", customer_message.join('\n'));

      request.session.shopping_cart = null;

      var amount = parseFloat(params.amount);

      response.render("cart/checkout", {title: "Order confirmation", items: items, confirmed: true, total: params.amount, total_cents: amount * 100});
    }
  }
};
