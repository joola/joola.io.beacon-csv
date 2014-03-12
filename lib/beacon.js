exports.push = function (options, callback) {
  var b = require('./converter');
  var joolaio = require('joola.io.sdk');
  var insertCount = 0;
  joolaio.init({host: options.host, APIToken: options.APIToken, debug: {enabled: false}}, function (err) {
    if (err)
      throw(err);
    b.convert(options.batchSize, options.csvPath, options.sleepTime, function (output, cb) {
      joolaio.beacon.insert(options.collectionName, output, {local:false}, cb);
    }, function () {
      callback();
    });
  });
};
