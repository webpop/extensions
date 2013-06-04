var mailer = require("mailer"),
    mail   = "name@example.com";


function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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
      item.total = price && item.quantity * price;
      result.push(item);
    }
  }
  return result;
};

exports.item_count = function() {
  var items    = getItems(),
      quantity = 0;
  for (var key in items) {
    quantity += parseInt(items[key], 10);
  };
  return numberWithCommas(quantity);
};

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
 * Returns the url to the checkout.
 */
exports.checkout_link = function(options) {
  return "/cart/checkout";
};

exports.routes = {
  get: {
    "checkout": function(params) {
      response.render("cart/checkout", {title: "Checkout", items: exports.items(), confirmed: false});
    }
  },
  post: {
    "add/:id": function(params) {
      var content = site.content({from: params.id});
      addItem(params);

      response.send("Product added", {Location: content.permalink || "/"}, 302);
    },

    "update/:id" : function(params) {
      var content =  site.content({from: params.id});
      updateItem(params);

      response.send("Product updated", {Location: "/cart/checkout"}, 302);
    },

    /* Process the items and deliver the order in a mail. */
    "checkout": function(params) {
      var items = exports.items();

      var message = ["New order from " + params.name, "", "Items: "];
      for (var i in items) {
        message.push("" + items[i].quantity + ": " + items[i].title);
      };
      message.push("\nName: " + params.name + "\nEmail: " + params.email + "\nAddress: " + params.address);
      mailer.send(mail, "New Order", message.join('\n'));

      request.session.shopping_cart = null;

      var amount = parseFloat(params.amount);

      response.render("cart/checkout", {title: "Order confirmation", items: items, confirmed: true, total: params.amount, total_cents: amount * 100});
    }
  }
};
