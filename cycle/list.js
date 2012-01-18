var groups = {
};

exports.cycle = function(options) {
  var group = options.group || "default";

  if (!(groups[group] && groups[group].values)) {
    groups[group] = {
      index: 0,
      values: options.values && options.values.split(',') || ['odd', 'even']
    };
  }
  
  var current = groups[group];
  
  var value = current.values[(current.index) % current.values.length].trim();
  current.index++;  
  
  return {
    'value': value,
    toString: function() { return value; }
  };
};