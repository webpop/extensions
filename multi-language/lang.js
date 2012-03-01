/* 
 * Set defaultLang to the language you want to show when no specific
 * language is set in the url.
 * Add all the alternative languages to the "languages" array
 */
var defaultLang = "en";
var languages   = ["es"];

var language = request.path_info.length == 3 || request.path_info.match(/\/..\//) ?
               request.path_info.substr(1,2) :
               defaultLang;

exports[defaultLang] = function() { return language == defaultLang; };

languages.forEach(function(lang) {
  exports[lang] = function() { return language == lang; };
});

exports[defaultLang] = language == defaultLang;
languages.forEach(function(lang) {
  exports[lang] = language == lang;
});

exports.current = function() { return language; };

exports.t = function(options, enclosed, scope) {
  if (options.field == "permalink") {
    return language == defaultLang ? scope.lookup('permalink') : "/" + language + scope.lookup('permalink') ;
  } else {
    var field = language == defaultLang ? options.field : options.field + "_" + language;
    return scope.lookup(field) || scope.lookup(options.field);
  }
};

exports.link = function(options) {
  return options.lang == defaultLang ? site.currentContent.permalink : "/" + options.lang + site.currentContent.permalink;
};

exports.get = {};
exports.get["(" + languages.join("|") + ")/(*)?"] = function() {
  var permalink = request.path_info.substr(3,request.path_info.length) || "/";
  var content   = site.content({conditions: {permalink: permalink}});
  
  response.render(content.template, content)
};