var assert = require('assert');

var dateFormat = require('./../lib/dateformat');

describe('isoUtcDateTime', function() {
  it('should correctly format the timezone part', function(done) {
    var actual = dateFormat('2014-06-02T13:23:21-08:00', 'yyyy-mm-dd\'T\'HH:MM:ssp');
    assert.strictEqual(actual, '2014-06-02T23:23:21+02:00');
    done();
  });
});
