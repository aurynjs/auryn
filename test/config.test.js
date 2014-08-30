var fs = require('fs');
var osenv = require('osenv');
var config = require('../lib/config');
var assert = require('assert');


describe('config', function () {

  it('should set in user config file', function (done) {
    config.set('foo.bar', 42, function (err) {
      if (err) throw err;

      assert.equal(
        JSON.parse(
          fs.readFileSync(
            osenv.home() + '/.aurynrc', 'utf8'
          )
        ).foo.bar,
        42
      );

      done();
    });
  });

});