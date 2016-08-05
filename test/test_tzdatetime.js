var assert = require('assert');

var dateFormat = require('./../lib/dateformat');

describe('isoUtcDateTime', function() {
  it('should correctly format the timezone part', function(done) {
    var actual = dateFormat('2014-06-02T13:23:21-08:00', 'yyyy-mm-dd\'T\'HH:MM:ssp');
    var actual2 = dateFormat('2014-06-02T13:23:21-08:00', 'yyyy-mm-dd\'T\'HH:MM:sso');
    assert.strictEqual(actual, actual2.replace(/(\d\d)$/, ':$1'));
    done();
  });
});
