/* This is a small extension that adds the typical blog-like archive to a section */

var file = require("file");

exports.archive = function(options) {
  if (!section) return null;
  
  return site.search({
    all: true,
    filters: {section: section},
    type: "Entry",
    order: "published_at DESC",
    timeline: {published_at: "month"},
  }).timeline.map(function(period) {
    var year  = period.start.getFullYear().toString(),
        month = period.start.getMonth().toString();
    period.permalink = file.join(section.permalink, year, (parseInt(month, 10) + 1).toString());
    return period;
  });
};


exports.get = {
  ":year/:month": function(params) {
    if (!section) return null;
    
    var results = site.search({
      all: true,               
      filters: {
        section: section,
        published_at: params.year + "-" + params.month
      },
      type: "Entry",
      order: "published_at DESC"
    }).results;
    
    var tpl  = section.template.replace(/\/[^\/]+.tpl/, "/archive.tpl");
    var date = new Date(parseInt(params.year), parseInt(params.month, 10) - 1, 1);

    response.render(tpl, {
      date: date,
      entries: function() {
        log("Hello");
        return results;
      },
      archive: exports.archive
    });
  }
};