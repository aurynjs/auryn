var osenv = require('osenv');
var path = require('path');

var def = module.exports = {};

def.auryn = {};
def.auryn.engine = {};
def.auryn.engine.path = path.join(osenv.home(), '.auryn', 'sdk');
def.auryn.engine.android = {};
def.auryn.engine.android.path = path.join(
  def.auryn.engine.path, 'android'
);
def.auryn.engine.android.jar = {};
def.auryn.engine.android.jar.path = def.auryn.engine.android.path;
def.auryn.engine.android.native = {};
def.auryn.engine.android.native.path = path.join(
  def.auryn.engine.android.path, 'native', 'libs'
);


def.android = {};
def.android.manifest = {
  rules: {
    application: {
      attrs: {
        'android:name': "AurynMainApplication"
      }
    },
    'application > activity': {
      attrs: {
        'android:name': ".AurynMainActivity"
      }
    }
  }
};
def.android.target = 'android-15';
def.android.templatedir = path.join(__dirname, 'templates', 'android');
def.project = {};
def.project.dockdir = './dock';
def.project.main = 'index.js';
def.xed = {};
def.xed.bin = path.join(require.resolve('xed'), '../bin/xed');
