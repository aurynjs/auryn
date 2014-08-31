var _ = require('lodash');
var fs = require('fs');
var handlebars = require('handlebars');
var sax = require('sax');


var XMLEditor = function (istream) {
  _.bindAll(this);

  this.istream = istream;
  this.ostream = process.stdout;
  this.level = 0;
  this.selfClosing = [];
};


var editor = XMLEditor.prototype;

editor.attributesTemplate = handlebars.compile(
  '{{#each this}} {{@key}}="{{this}}"{{/each}}'
);

editor.openTagTemplate = handlebars.compile(
  '{{indent}}<{{name}}{{{attributes}}}{{#isSelfClosing}} /{{/isSelfClosing}}>\n'
);

editor.closeTagTemplate = handlebars.compile(
  '{{indent}}</{{name}}>\n'
);

editor.opentag = function (tag) {
  this.currentTag = tag;
  this.ostream.write(this.openTagTemplate(_.extend(tag, {
    attributes: this.attributesTemplate(tag.attributes),
    indent: _.range(this.level).map(function () {
      return '    ';
    }).join('')
  })));

  if (!tag.isSelfClosing) this.level++;

  this.selfClosing.push(tag.isSelfClosing);
};

editor.closetag = function (name) {
  if (this.selfClosing.pop()) return;

  this.level--;
  this.ostream.write(this.closeTagTemplate({
    name: name,
    isSelfClosing: this.isSelfClosing,
    indent: _.range(this.level).map(function () {
      return '    ';
    }).join('')
  }));

};

editor.to = function (filePath) {
  this.ostream = fs.createWriteStream(filePath + '.out');

  return this;
};

editor.start = function () {
  this.saxStream = sax.createStream(false, {lowercasetags: true});

  this.saxStream.on('opentag', this.opentag);
  this.saxStream.on('closetag', this.closetag);
  this.istream.pipe(this.saxStream);
  return this;
};

exports.from = function (filePath) {
  return new XMLEditor(fs.createReadStream(filePath));
};