var _ = require('underscore');
var async = require('async');
var fs = require('fs');
var osenv = require('osenv');
var path = require('path');


var config = module.exports = {};


var USER_CONFIG_PATH = path.join(osenv.home(), '.aurynrc');
var PROJECT_CONFIG_PATH = path.join('.', 'package.json');
var NAME_REGEXP = /^[a-z]+[a-z\.]*[a-z]+$/;



var BadNameError = function (name) {
  Error.apply(this, 'Bad config name : "' + name + '"');
};

BadNameError.prototype = Error.prototype;


var setp = function (ctx, parts, value) {
  if (parts.length === 1) return ctx[parts[0]] = value;
  if (! _.has(ctx, parts[0])) ctx[parts[0]] = {};
  
  setp(ctx[parts[0]], _.rest(parts), value); 
};


config.set = function (name, value, done) {
  if (! name.match(NAME_REGEXP)) return done(new BadNameError(name));

  var parts = name.split('.');  
  var filePath = USER_CONFIG_PATH;

  async.waterfall([
    function (next) {
      fs.readFile(filePath, 'utf8', next);
    },
    function (raw, next) {
      try {
        next(null, JSON.parse(raw));
      } catch (err) {
        next(err);
      }
    },
    function (ctx, next) {
      try {
        setp(ctx, parts, value);
        fs.writeFile(filePath, JSON.stringify(ctx, null, 2), next);
      } catch (err) {
        next(err);
      }      
    }
  ], done)
};


config.BadNameError = BadNameError;
