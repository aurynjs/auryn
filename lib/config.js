var _ = require('lodash');
var async = require('async');
var fs = require('fs');
var osenv = require('osenv');
var path = require('path');


var config = module.exports = {};


var USER_CONFIG_PATH = path.join(osenv.home(), '.aurynrc');
var PROJECT_CONFIG_PATH = path.join('.', 'package.json');
var NAME_REGEXP = /^[a-z]+[a-z\.]*[a-z]+$/;



var BadNameError = function (name) {
  this.name = 'BadNameError';
  this.message = 'Bad config name : "' + name + '"';
};

BadNameError.prototype = Error.prototype;


var setp = function (ctx, parts, value) {
  if (parts.length === 1) return ctx[parts[0]] = value;
  if (! _.has(ctx, parts[0])) ctx[parts[0]] = {};
  
  setp(ctx[parts[0]], _.rest(parts), value); 
};

var getp = function (ctx, parts) {
  if (parts.length === 1) return ctx[parts[0]];
  if (! _.has(ctx, parts[0])) return undefined;

  return getp(ctx[parts[0]], _.rest(parts));
};

config.get = function (name, opts, done) {
  if (! name.match(NAME_REGEXP)) return done(new BadNameError(name));

  opts = opts || {};

  var res;
  var ctx = {};
  var parts = name.split('.');  
  var filePath = USER_CONFIG_PATH;
  var projectFilePath = opts.projectConfigPath || PROJECT_CONFIG_PATH;

  async.waterfall([
    function (next) {
      fs.readFile(projectFilePath, 'utf8', function (err, rawProject) {
        // Ignore error
        next(null, rawProject || '{}');
      });
    },
    function (rawProject, next) {
      var ctx = {};

      try {
        ctx.project = JSON.parse(rawProject);
        fs.readFile(filePath, 'utf8', function (err, raw) {
          next(null, ctx, raw);
        });
      } catch (err) {
        next(err);
      }
    },
    function (ctx, raw, next) {
      try {
        ctx = _.merge(JSON.parse(raw), ctx);
        res = getp(ctx, parts);
        next(null);
      } catch (err) {
        next(err);
      }      
    }
  ], function (err) {
    done(err, res);
  });

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
      var ctx;

      try {
        ctx = JSON.parse(raw);
        setp(ctx, parts, value);
        fs.writeFile(filePath, JSON.stringify(ctx, null, 2), next);
      } catch (err) {
        next(err);
      }      
    }
  ], done)
};


config.BadNameError = BadNameError;
