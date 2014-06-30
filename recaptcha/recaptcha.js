var http = require("http");

var public_key  = "YOUR_PUBLIC_KEY",
    private_key = "YOUR_PRIVATE_KEY",
    verify_url  = "http://www.google.com/recaptcha/api/verify";

exports.captcha = function() {
  html = '<script type="text/javascript" ' +
         'src="http://www.google.com/recaptcha/api/challenge?k=' + public_key + '">' +
         '</script>' +
         '<noscript>' +
         '<iframe src="http://www.google.com/recaptcha/api/noscript?k=' + public_key + '" ' +
         'height="300" width="500" frameborder="0"></iframe><br>' +
         '<textarea name="recaptcha_challenge_field" rows="3" cols="40">' +
         '</textarea>' +
         '<input type="hidden" name="recaptcha_response_field" ' +
         'value="manual_challenge">' +
  '</noscript>'

  return {
    html: html
  }
}

exports.validate = function(options, params, errors) {
  var response = http.post(verify_url, {
    data: {
      privatekey: private_key,
      remoteip: request.ip,
      challenge: request.params.recaptcha_challenge_field,
      response: request.params.recaptcha_response_field
    }
  });

  if (response.split("\n")[0] !== "true") {
    errors.captcha = "Error validating captcha"
  }
}
