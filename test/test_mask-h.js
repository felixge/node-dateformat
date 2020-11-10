var assert = require("assert");
var dateFormat = require("../lib/dateformat");

describe("Mask: 'h'", function () {
  it("should format '2020-10-22T22:10:59.736' as '10'", function (done) {
    var date = new Date("2020-10-22T22:10:59.736");
    var d = dateFormat(date, "h");
    assert.strictEqual(d, "10");
    done();
  });

  it("should format '2020-10-13T13:30:41.278' as '1'", function (done) {
    var date = new Date("2020-10-13T13:30:41.278");
    var d = dateFormat(date, "h");
    assert.strictEqual(d, "1");
    done();
  });

  it("should format '1993-02-19T03:18:18.711' as '3'", function (done) {
    var d = dateFormat("1993-02-19T03:18:18.711", "h");
    assert.strictEqual(d, "3");
    done();
  });

  it("should format '2134-01-25T02:20:42.816' as '2'", function (done) {
    var d = dateFormat("2134-01-25T02:20:42.816", "h");
    assert.strictEqual(d, "2");
    done();
  });
});
