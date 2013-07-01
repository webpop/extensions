exports.original = function(options) {
  return !request.params.ab;
};

exports.variation = function(options) {
  return request.params.ab == options.name;
};

exports.experiment_code = function(options) {
  if ("ab" in request.params) { return; }
  if (request.path !== options.path) { return; }

  if (!options.key) {
    return {html: "<!-- Make sure to pass your experiment key to the tag. -->"};
  }


  var html = "<script>function utmx_section(){}function utmx(){}(function(){var " +
             "k='" + options.key + "',d=document,l=d.location,c=d.cookie;" +
             "if(l.search.indexOf('utm_expid='+k)>0)return;" +
             "function f(n){if(c){var i=c.indexOf(n+'=');if(i>-1){var j=c." +
             "indexOf(';',i);return escape(c.substring(i+n.length+1,j<0?c." +
             "length:j))}}}var x=f('__utmx'),xx=f('__utmxx'),h=l.hash;d.write(" +
             "'<sc'+'ript src=\"'+'http'+(l.protocol=='https:'?'s://ssl':" +
             "'://www')+'.google-analytics.com/ga_exp.js?'+'utmxkey='+k+" +
             "'&utmx='+(x?x:'')+'&utmxx='+(xx?xx:'')+'&utmxtime='+new Date()." +
             "valueOf()+(h?'&utmxhash='+escape(h.substr(1)):'')+" +
             "'\" type=\"text/javascript\" charset=\"utf-8\"><\/sc'+'ript>')})();" +
             "</script><script>utmx('url','A/B');</script>";

  if (options.cookie_domain) {
    html = '<script>_udn = "' + options.cookie_domain + '"</script>' + html;
  }
  return {html: html};
};