/*
 * Generated sources management
 */


/**
 * Module dependencies.
 */

var handlebars = require('handlebars');
var path = require('path');
var fs = require('fs');


 /*
  * Pre-calculate templates
  */

function compileTemplate(sourceId) {
    return handlebars.compile(
        fs.readFileSync(path.join(
            __dirname,
            'templates',
            'android-main.hbs'
        ), 'utf8')
    );
};

var templates = {
    'android-main': compileTemplate('android-main')
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

source.generate = function (sourceId, project, dest, done) {
    if (! templates.hasOwnProperty(sourceId)) return done(new source.IdError(sourceId));

    fs.writeFile(dest, templates[sourceId](project), done)
};