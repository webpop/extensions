/* This is a simple example for handling a contact form. */

var mailer = require('mailer');
var result = null;

exports.deliver = function(options) {
  if (result) return result;
  if (request.request_method !== "POST") return null;

  if (request.params.name && request.params.email && request.params.message) {
    var subject = 'New message from ' + request.params.name + ' (' + request.params.email + ')',
        message = request.params.message;

    mailer.send(options.to, subject, message);

    result = {success: true};
  } else {
    result = {error: true};
  }
  return result;
};

exports.name = function() { 
  return result && result.error && request.params.name;
};
exports.email = function() {
  return result && result.error && request.params.email;
};
exports.message = function() {
  return result && result.error && request.params.message;
};