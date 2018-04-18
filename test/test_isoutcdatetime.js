var assert = require('assert');

var dateFormat = require('./../lib/dateformat');

describe('isoUtcDateTime', function() {
  it('should correctly format the timezone part', function(done) {
    var actual = dateFormat('2014-06-02T13:23:21-08:00', 'isoUtcDateTime');
    assert.strictEqual(actual, '2014-06-02T21:23:21Z');
    var epochTime = dateFormat(0, 'isoUtcDateTime');
    assert.strictEqual(epochTime, '1970-01-01T00:00:00Z');
    done();
  });
});
