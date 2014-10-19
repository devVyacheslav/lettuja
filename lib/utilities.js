'use strict';
// var marked = require('marked');

// Split any string into two by delimiter
function splitTwo(string, delimeter) {
  var position = string.indexOf(delimeter);
  return [string.substr(0, position), string.substr(position + delimeter.length)];
}

// Sort fileDatabase array items by unixDate
function sortByDate(a, b) {
  if (a.unixDate < b.unixDate) {
    return -1;
  }
  if (a.unixDate > b.unixDate) {
    return 1;
  }
  return 0;
}

// Search 'data' and return true if any item matches 'match'
function findTraverse(data, match) {
  var prop;
  for (prop in data) {
    if (!data.hasOwnProperty(prop)) {
      continue;
    }
    if (data[prop] === match) {
      return true;
    }
    if (typeof data[prop] === 'object' && findTraverse(data[prop], match)) {
      return true;
    }
  }
  return false;
}

function fixMarkdown(marked) {
  // Prevent Marked markdown parser from removing non-breaking characters
  marked.Lexer.prototype.lex = function (src) {
    src = src
      .replace(/\r\n|\r/g, "\n")
      .replace(/\t/g, "    ")
      .replace(/\u2424/g, "\n");
    return this.token(src, true);
  };
  // Enable cyrillic in heading IDs
  marked.Renderer.prototype.heading = function(text, level, raw) {
    return '<h'+ level + ' id="' + this.options.headerPrefix +
        raw.toLowerCase().replace(/[^[\w\u0100-\uffff\]]+/g, '-') + '">' +
        text + '</h' + level + '>\n';
  };
}

module.exports.splitTwo = splitTwo;
module.exports.sortByDate = sortByDate;
module.exports.findTraverse = findTraverse;
module.exports.fixMarkdown = fixMarkdown;