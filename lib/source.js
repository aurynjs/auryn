/*
 * Generated sources management
 */


/**
 * Module dependencies.
 */

var async = require('async');
var handlebars = require('handlebars');
var path = require('path');
var fs = require('fs');


 /*
  * Pre-calculate templates
  */

function compileTemplate(templateId) {
  return handlebars.compile(
    fs.readFileSync(path.join(
      __dirname,
      'templates',
      templateId
    ), 'utf8')
  );
};

var templates = {
  'android': [
    {
      dest: handlebars.compile('{{genDir}}/AurynMainApplication.java'),
      source: compileTemplate('android-main.hbs')
    },
    {
      dest: handlebars.compile('{{genDir}}/AurynMainActivity.java'),
      source: compileTemplate('android-activity.hbs')
    },
    {
      dest: handlebars.compile('{{genDir}}/AurynInfo.java'),
      source: compileTemplate('android-info.hbs')
    }
  ]
};


/*
 * Define module namespace for API and Errors
 */

var source = module.exports = {};


/* Error thrown when sourceId does not exist */

source.IdError = function (sourceId) {
  thid.code = 3;
  this.name = 'SourceId Error';
  this.message = 'The template with source id "' + sourceId + '" is unknown';
};

source.IdError.prototype = Error.prototype;


/* Generate source from hbs template and project context */

source.generate = function (sourceId, project, genCtx, done) {
  if (! templates.hasOwnProperty(sourceId)) return done(new source.IdError(sourceId));

  async.each(templates[sourceId], function (templateDef, next) {
    fs.writeFile(templateDef.dest(genCtx), templateDef.source(project), next);
  }, done);
};