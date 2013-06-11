Stripe Payments Integration
===========================

Add Stripe.js to your extensions folder.

Add configuration.tpl to your layout template. This will create a prompt for the Stripe API keys required to interoperate with Stripe for payment processing.

Use the regular client side stripe script to validate the credit card, then on your confirmation page, include charge.tpl to process the payment.