var assert = require("assert");

var _ = require("underscore");

var dateFormat = require("../lib/dateformat");

var expects = {
  default: "Wed Nov 26 2014 13:19:44",
  shortDate: "11/26/14",
  mediumDate: "Nov 26, 2014",
  longDate: "November 26, 2014",
  fullDate: "Wednesday, November 26, 2014",
  shortTime: "1:19 PM",
  mediumTime: "1:19:44 PM",
  longTime: "1:19:44 PM %TZ_PREFIX%%TZ_OFFSET%",
  isoDate: "2014-11-26",
  isoTime: "13:19:44",
  isoDateTime: "2014-11-26T13:19:44%TZ_OFFSET%",
  isoUtcDateTime: "",
  expiresHeaderFormat: "Wed, 26 Nov 2014 13:19:44 %TZ_PREFIX%%TZ_OFFSET%",
};

function pad(num, size) {
  var s = num + "";
  while (s.length < size) {
    s = "0" + s;
  }
  return s;
}

function parseOffset(date) {
  var offset = date.getTimezoneOffset();
  var hours = Math.floor((-1 * offset) / 60);
  var minutes = -1 * offset - hours * 60;
  var sign = offset > 0 ? "-" : "+";
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

describe("dateformat([now], [mask])", function () {
  _.each(dateFormat.masks, function (value, key) {
    it("should format `" + key + "` mask", function (done) {
      var now = new Date(2014, 10, 26, 13, 19, 44);
      var tzOffset = timezoneOffset(now);
      var expected = expects[key]
        .replace(/%TZ_PREFIX%/, "GMT")
        .replace(/%TZ_OFFSET%/g, tzOffset)
        .replace(/GMT\+0000/g, "UTC");
      if (key === "isoUtcDateTime") {
        var offset = parseOffset(now);
        now.setHours(
          now.getHours() - offset.hours,
          now.getMinutes() - offset.minutes
        );
        var expected = now.toISOString().replace(/\.000/g, "");
      }
      var actual = dateFormat(now, key);
      assert.strictEqual(actual, expected);
      done();
    });
  });
  it("should use `default` mask, when `mask` is empty", function (done) {
    var now = new Date(2014, 10, 26, 13, 19, 44);
    var expected = expects["default"];
    var actual = dateFormat(now);

    assert.strictEqual(actual, expected);
    done();
  });
  describe("when system long date format is 'den 'd MMMM yyyy", function () {
    it("should format timezone in longTime", function () {
      // Arrange
      var date = "Wed Nov 26 2014 13:19:44 GMT+0100 (GMT+01:00)";
      Date.prototype.toString = function () {
        return date;
      };
      Date.prototype.getTimezoneOffset = function() { return -60; };
      var tzOffset = "+0100";
      var expected = expects["longTime"]
        .replace(/%TZ_PREFIX%/, "GMT")
        .replace(/%TZ_OFFSET%/g, tzOffset)
        .replace(/GMT\+0000/g, "UTC");
      // Act
      var actual = dateFormat(date, "longTime");
      // Assert
      assert.strictEqual(actual, expected);
    });
  });
  describe("timezone format", function() {
    it("should output +0100 when timezone is UTC+1", function() {
      // arrange
      var date = new Date(2014, 10, 26, 13, 19, 44);
      Date.prototype.getTimezoneOffset = function() { return -60; }  // timezone +0100
      // act
      var actual = dateFormat(date, "longTime");
      // assert
      assert(actual.match(/\+0100/));
    });
    it("should output -0100 when timezone is UTC-1", function() {
      // arrange
      var date = new Date(2014, 10, 26, 13, 19, 44);
      Date.prototype.getTimezoneOffset = function() { return +60; }  // timezone -0100
      // act
      var actual = dateFormat(date, "longTime");
      // assert
      assert(actual.match(/\-0100/));
    });
    it("should output GMT when timezone is GMT", function () {
      // arrange
      var date = new Date(2014, 10, 26, 13, 19, 44);
      Date.prototype.getTimezoneOffset = function() { return 0; }  // timezone UTC
      // act
      var actual = dateFormat(date, "longTime");
      // assert
      assert(actual.match(/GMT/));
    });
    it("should output +0530 for India", function () {
      // arrange
      var date = new Date(2014, 10, 26, 13, 19, 44);
      Date.prototype.getTimezoneOffset = function() { return -330; }  // timezone +0530
      // act
      var actual = dateFormat(date, "longTime");
      // assert
      assert(actual.match(/\+0530/));
    });
    it("should output time in GMT when gmt is set to true", function() {
      // arrange
      var date = new Date(2014, 10, 26, 13, 19, 44);
      Date.prototype.getTimezoneOffset = function() { return -60; }  // timezone +0100
      // act
      var actual = dateFormat(date, "longTime", false, true);
      // assert
      assert(actual.match(/GMT\+0100/));
    });
    it("should output time in UTC when utc is true", function() {
      // arrange
      var date = new Date(2014, 10, 26, 13, 19, 44);
      Date.prototype.getTimezoneOffset = function() { return -60; }  // timezone +0100
      // act
      var actual = dateFormat(date, "longTime", true, false);
      // assert
      assert(actual.match(/UTC\+0100/));
    }),
    it("has no idea what happens when GMT is true and UTC is true", function() {
      // arrange
      var date = new Date(2014, 10, 26, 13, 19, 44);
      Date.prototype.getTimezoneOffset = function() { return -60; }  // timezone +0100
      // act
      var actual = dateFormat(date, "longTime", true, true);
      // assert
      assert(actual.match(/GMT\+0100/));
    });
    it("should output PT if timezone is pacific time", function() {
      // arrange
      var date = new Date(2014, 10, 26, 13, 19, 44);
      Date.prototype.getTimezoneOffset = function() { return +420; }  // timezone -0700
      Date.prototype.toString = function () {
        return "Wed Nov 26 2014 13:19:44 PDT";
      };
      // act
      var actual = dateFormat(date, "longTime");
      // assert
      assert(actual.match(/PDT/));
      assert(!(actual.match(/\d{4}/)));
    });
  });
});
