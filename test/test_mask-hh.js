var assert = require("assert");
var dateFormat = require("../lib/dateformat");

describe("Mask: 'hh'", function () {
  it("should format '1987-02-11T11:03:16.637' as '11'", function (done) {
    var date = new Date("1987-02-11T11:03:16.637");
    var d = dateFormat(date, "hh");
    assert.strictEqual(d, "11");
    done();
  });

  it("should format '2014-09-28T04:29:52.509' as '04'", function (done) {
    var date = new Date("2020-09-28T04:29:52.509");
    var d = dateFormat(date, "hh");
    assert.strictEqual(d, "04");
    done();
  });

  it("should format '2001-08-02T19:14:19.263' as '07'", function (done) {
    var d = dateFormat("2001-08-02T19:14:19.263", "hh");
    assert.strictEqual(d, "07");
    done();
  });

  it("should format '1872-01-22T19:26:01.744' as '07'", function (done) {
    var d = dateFormat("1872-01-22T19:26:01.744", "hh");
    assert.strictEqual(d, "07");
    done();
  });
});
