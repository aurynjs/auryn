var _ = require('lodash');
var fs = require('fs');
var sax = require('sax');


var XMLEditor = function (istream) {
  _.bindAll(this);

  this.istream = istream;
  this.ostream = process.stdout;
};

var editor = XMLEditor.prototype;

editor.opentag = function (tag) {
  // this.ostream.write(tag.name);
};


editor.to = function (filePath) {
  this.ostream = fs.createWriteStream(filePath + '.out');

  return this;
};

editor.start = function () {
  this.saxStream = sax.createStream(false, {lowercasetags: true});

  this.saxStream.on('opentag', this.opentag);
  this.istream.pipe(this.saxStream);
  return this;
};

exports.from = function (filePath) {
  return new XMLEditor(fs.createReadStream(filePath));
};