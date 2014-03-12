exports.convert = function (batchSize, path, sleepTime, batchCallback, callback) {
  var sleep = require('sleep');
  var output = [];
  var Converter = require("csvtojson").core.Converter;

  var csvConverter = new Converter();
  var i = 0;

  var counter = 0;
  var rowCount = 0;
  csvConverter.on("record_parsed", function (resultRow, rawRow, rowIndex) {
    rowCount++;
    output.push(resultRow);
    if (i % batchSize === 0) {
      counter++;
      batchCallback(output, function () {
        console.log('batch done', counter);
        counter--;
      });
      output = [];
      sleep.usleep(sleepTime);
    }
    i++;
  });

  csvConverter.on("end_parsed", function (jsonObj) {
    console.log('csv finished');
    batchCallback(output, function () {
      console.log('waiting');
      while (counter > 0) {
        sleep.usleep(1000);
      }
      callback(null,rowCount);
    });
  });

  csvConverter.from(path);
};
