Shopping Cart Extension
=======================

This is a very barebones shopping cart extensions for getting started
with a simple shopping cart.

Orders are simply submitted via email.

Usage
=====

1. Upload cart.js to your extension folder
2. Change the email address at the top of cart.js to whatever email you
   want to send the orders to (a comma separated list of emails works as well)
3. Upload "cart.tpl" to your **layouts** folder
4. Create a **cart** folder in your templates folder and upload "cart/index.tpl" and "cart/_current_items.tpl" to it.
5. Create a **store** folder in your templates folder and upload "index.tpl" and "product.tpl" to it
6. Create a new section called "Store" and assign it to "store/index.tpl"
7. Add some entries to the "Store" section with a single line text field named "price", give the entries a price that looks like "5.99", assign the entries to "store/product.tpl"


Now you're good to go and should be able to view the items in your store, add them to your cart and order them through the checkout process.

A Starting Point
==============

The cart.js extension is meant as a starting point, not a finished
shopping cart.



