var assert = require("assert");
var dateFormat = require("../lib/dateformat");

describe("Mask: 'S'", function () {
  it("should format '1984-02-7' as 'th'", function (done) {
    let date = new Date("1984-02-7");
    var d = dateFormat(date, "S");
    assert.strictEqual(d, "th");
    done();
  });

  it("should format '2013-01-3' as 'rd'", function (done) {
    let date = new Date("2013-01-3");
    var d = dateFormat(date, "S");
    assert.strictEqual(d, "rd");
    done();
  });

  it("should format '2034-11-22' as 'nd'", function (done) {
    var d = dateFormat("2034-11-22", "S");
    assert.strictEqual(d, "nd");
    done();
  });

  it("should format '2002-02-1' as 'st'", function (done) {
    var d = dateFormat("2002-02-1", "S");
    assert.strictEqual(d, "st");
    done();
  });
});
