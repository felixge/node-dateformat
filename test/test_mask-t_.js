var assert = require("assert");
var dateFormat = require("../lib/dateformat");

describe("Mask: 'T'", function () {
  it("should format '1654-04-11T08:47:34.086' as 'A'", function (done) {
    var date = new Date("1654-04-11T08:47:34.086");
    var d = dateFormat(date, "T");
    assert.strictEqual(d, "A");
    done();
  });

  it("should format '2001-02-06T15:10:43.798' as 'P'", function (done) {
    var date = new Date("2001-02-06T15:10:43.798");
    var d = dateFormat(date, "T");
    assert.strictEqual(d, "P");
    done();
  });

  it("should format '1998-12-01T12:43:14.920' as 'A'", function (done) {
    var d = dateFormat("2020-08-29T00:32:00.101", "T");
    assert.strictEqual(d, "A");
    done();
  });

  it("should format '2020-10-01T17:20:03.223' as 'p'", function (done) {
    var d = dateFormat("2020-10-01T17:20:03.223", "T");
    assert.strictEqual(d, "P");
    done();
  });
});
