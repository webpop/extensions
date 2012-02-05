exports.breadcrumbs = function(options) {
  var content = site.currentContent;
  var breadcrumb = [content];
  while (content = content.parent) {
    breadcrumb.unshift(content);
  }
  return breadcrumb;
};