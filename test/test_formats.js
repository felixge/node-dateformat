var assert = require('assert');
var dateFormat = require('../lib/dateformat');

var expects = {
  'default':               'Wed Nov 26 2014 13:19:44',
  'shortDate':             '11/26/14',
  'mediumDate':            'Nov 26, 2014',
  'longDate':              'November 26, 2014',
  'fullDate':              'Wednesday, November 26, 2014',
  'shortTime':             '1:19 PM',
  'mediumTime':            '1:19:44 PM',
  'longTime':              '1:19:44 PM %TZ_PREFIX%%TZ_OFFSET%',
  'isoDate':               '2014-11-26',
  'isoTime':               '13:19:44',
  'isoDateTime':           '2014-11-26T13:19:44%TZ_OFFSET%',
  'isoUtcDateTime':        '',
  'expiresHeaderFormat':   'Wed, 26 Nov 2014 13:19:44 %TZ_PREFIX%%TZ_OFFSET%'
};

function pad(num, size) {
    var s = num + '';
    while (s.length < size) {
      s = '0' + s;
    }
    return s;
}

function parseOffset(date) {
  var offset = date.getTimezoneOffset();
  var hours = Math.floor(-1 * offset / 60);
  var minutes = (-1 * offset) - (hours * 60);
  var sign = offset > 0 ? '-' : '+';
  return {
    offset: offset,
    hours: hours,
    minutes: minutes,
    sign: sign,
  };
}

function timezoneOffset(date) {
  var offset = parseOffset(date);
  return offset.sign + pad(offset.hours, 2) + pad(offset.minutes, 2);
}

describe('dateformat([now], [mask])', function() {
  Object.keys(dateFormat.masks).forEach(function(key) {
    var value = dateFormat.masks[key];
    it('should format `' + key + '` mask', function(done) {
      var now = new Date(2014, 10, 26, 13, 19, 44);
      var tzOffset = timezoneOffset(now);
      var expected = expects[key].replace(/%TZ_PREFIX%/, 'GMT')
                                 .replace(/%TZ_OFFSET%/g, tzOffset)
                                 .replace(/GMT\+0000/g, 'UTC');
      if (key === 'isoUtcDateTime') {
        var offset = parseOffset(now);
        now.setHours(now.getHours() - offset.hours,
                     now.getMinutes() - offset.minutes);
        var expected = now.toISOString().replace(/\.000/g, '');
      }
      var actual = dateFormat(now, key);
      assert.strictEqual(actual, expected);
      done();
    });
  });
  it('should use `default` mask, when `mask` is empty', function(done) {
    var now = new Date(2014, 10, 26, 13, 19, 44);
    var expected = expects['default'];
    var actual = dateFormat(now);

    assert.strictEqual(actual, expected);
    done();
  });

  it('should use two digits when formatting milliseconds with L', function () {
    const date = new Date('2018-11-12T05:19:45.997Z');
    assert.strictEqual(dateFormat(date, "UTC:ss.L'Z'"), '45.99Z');
  })

  it('should be possible to format zone with or without colon', function () {
    var actual = dateFormat('2014-06-02T13:23:21-08:00', 'yyyy-mm-dd\'T\'HH:MM:ssp');
    var actual2 = dateFormat('2014-06-02T13:23:21-08:00', 'yyyy-mm-dd\'T\'HH:MM:sso');
    assert.strictEqual(actual, actual2.replace(/(\d\d)$/, ':$1'));
  })
});
