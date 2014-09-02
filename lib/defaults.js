var path = require('path');

var defaults = module.exports = {
  android: {
    manifest: {
      rules: {
        application: {
          attrs: {
            'android:Name': "AurynMainApplication"
          }
        },
        'application > activity': {
          attrs: {
            'android:Name': ".AurynMainActivity"
          }
        }
      }
    },
    target: "android-15"
  },
  project: {
    dockdir: "dock"
  },
  xed: {
    bin: path.join(
      require.resolve('xed'),
      '../bin/xed'
    )
  }
}
