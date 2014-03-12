var chai = require('chai');
chai.use(require('sinon-chai'));
var options = require('../../config').options();
var joolaio = require('joola.io.sdk');
var test = require('../../lib/beacon.js');
expect = chai.expect;

options.collectionName = 'testunit';


describe("Test joola.io connection", function () {
  it("Should successfuly connect to the defined joola.io server", function (done) {
    joolaio.init({host: options.host, APIToken: options.APIToken, debug: {enabled: false}}, function (err) {
      if (!err)
        done();
    });
  });
});

describe("Parse and push CSV", function () {
  it("Should successfully push a new document", function (done) {
    test.push(options, function (err, rows) {
      if (!err)
        done();
      //process.exit();
    });
  });

  it("Should successfully get the inserted test record from beacon", function (done) {
    var query = {metrics: [
      {
        key: 'testfield',
        collection: 'testunit',
        aggregation: 'count'
      }
    ]};
    joolaio.query.fetch(query, function (err, result) {
      if (!err)
        if (result.documents[0].values.testfield > 0)
          done();
    });
  });

  it("Should successfully delete the testunit collection", function (done) {
    joolaio.collections.delete('joola', 'testunit', function (err) {
      done();
    });
  });
});