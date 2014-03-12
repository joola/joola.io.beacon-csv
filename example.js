var example = require('./lib/beacon.js');
var start = new Date().getTime();
var config = require('./config').options();


example.push(config.options, function (err, rows) {
  var end = new Date().getTime();
  console.log('done!', end - start, 'ms', ((end - start) / rows) + 'rows/ms');
  //process.exit();
});