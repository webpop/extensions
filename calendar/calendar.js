var file = require("file");

exports.events = function() {
  if (!section) return null;
  
  return site.search({
    all: true,
    filters: {section: section, date: "future"},
    order: "date ASC"
  }).results;
};

exports.weeks = function() {
  if (!section) return null;
  
  return site.search({
    all: true,
    filters: {section: section, date: "future"},
    timeline: {date: "week"},
  }).timeline;
};

exports.week_link = function(options) {
  log(options.start);
  var t     = new Date(options.start),
      year  = t.getFullYear().toString(),
      month = t.getMonth().toString(),
      day   = t.getDate().toString();
  
  return file.join(section.permalink, "week", year, month, day);
};

exports.get = {
  "week/:year/:month/:day": function(params) {
    if (!section) return null;
    
    var year  = parseInt(params.year, 10),
        month = parseInt(params.month, 10),
        day   = parseInt(params.day, 10),
        start = new Date(year, month, day),
        end   = new Date(start.getTime() + (1000 * 60 * 60 * 24 * 7));
    
    var results = site.search({
      all: true,               
      filters: {section: section, date: {from: start, to: end}},
      order: "date ASC"
    }).results;
    
    response.render("events.tpl", {
      start: start,
      end: end,
      events: results,
      weeks: exports.weeks,
      week_link: exports.week_link
    });
  }
};