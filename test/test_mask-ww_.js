var assert = require("assert");
var dateFormat = require("../lib/dateformat");

describe("Mask: 'WW'", function () {
  it("should format '1876-01-12' as '02'", function (done) {
    var date = new Date("1876-01-12");
    var d = dateFormat(date, "WW");
    assert.strictEqual(d, "02");
    done();
  });

  it("should format '2013-12-11' as '50'", function (done) {
    var date = new Date("2013-12-11");
    var d = dateFormat(date, "WW");
    assert.strictEqual(d, "50");
    done();
  });

  it("should format '2020-03-04' as '10'", function (done) {
    var d = dateFormat("2020-03-04", "WW");
    assert.strictEqual(d, "10");
    done();
  });

  it("should format '2020-02-01' as '05'", function (done) {
    var d = dateFormat("2020-02-01", "WW");
    assert.strictEqual(d, "05");
    done();
  });
});
