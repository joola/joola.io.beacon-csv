var chai = require('chai');
chai.use(require('sinon-chai'));
var options = require('../../config').options();
var joolaio = require('joola.io.sdk');
expect = chai.expect;


describe("Test joola.io connection", function() {
  it("Should successfuly connect to the defined joola.io server", function(done) {
    joolaio.init({host: options.host, APIToken: options.APIToken, debug: {enabled: false}}, function (err) {
      if (!err)
        done();
    });
    
    
  });
});