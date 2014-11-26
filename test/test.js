var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var exec = require('assert');
var forOwn = require('for-own');
var dateFormat = require('../lib/dateformat');
var now = 1417000784633;

var expects = {
  'default':               'Wed Nov 26 2014 13:19:44',
  'shortDate':             '11/26/14',
  'mediumDate':            'Nov 26, 2014',
  'longDate':              'November 26, 2014',
  'fullDate':              'Wednesday, November 26, 2014',
  'shortTime':             '1:19 PM',
  'mediumTime':            '1:19:44 PM',
  'longTime':              '1:19:44 PM GMT+0200',
  'isoDate':               '2014-11-26',
  'isoTime':               '13:19:44',
  'isoDateTime':           '2014-11-26"P"13:19:44',
  'isoUtcDateTime':        '2014-11-26"A"11:19:44"UTC"',
  'expiresHeaderFormat':   'Wed, 26 Nov 2014 13:19:44 GMT+0200'
};

describe('dateformat([now], [mask])', function() {
  forOwn(dateFormat.masks, function(value, key) {
    it('should format `' + key + '` mask', function(done) {
      var expected = expects[key];
      var actual = dateFormat(now, key);

      actual.should.equal(expected);
      done();
    });
  });
  it('should use `default` mask, when `mask` is empty', function(done) {
    var expected = expects['default'];
    var actual = dateFormat(now);

    actual.should.equal(expected);
    done();
  });
});
