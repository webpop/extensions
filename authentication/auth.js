var username = "admin",
    password = "secret";

exports.authenticate = function() {
  if (request.request_method !== "POST" || request.params.logout) return null;
  
  if (request.params.username == username && request.params.password == password) {
    request.session.authenticated = true;
  }
  
  return {
    error: request.session.authenticated ? false : true,
    success: request.session.authenticated
  };
}

exports.authenticated = function() {
  if (request.params.logout) {
    request.session.authenticated = null;
    return false;
  }
  
  if (request.session.authenticated) {
    return true;
  }
  
  return null;
}