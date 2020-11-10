var assert = require("assert");
var dateFormat = require("../lib/dateformat");

describe("Mask: 'm'", function () {
  it("should format '1974-02-7' as '2'", function (done) {
    var date = new Date("1974-02-7");
    var d = dateFormat(date, "m");
    assert.strictEqual(d, "2");
    done();
  });

  it("should format '1992-09-03' as '9'", function (done) {
    var date = new Date("1992-09-03");
    var d = dateFormat(date, "m");
    assert.strictEqual(d, "9");
    done();
  });

  it("should format '2043-12-22' as '12'", function (done) {
    var date = new Date("2043-12-22");
    var d = dateFormat(date, "m");
    assert.strictEqual(d, "12");
    done();
  });

  it("should format '1800-01-01' as '1'", function (done) {
    var date = new Date("1800-01-01");
    var d = dateFormat(date, "m");
    assert.strictEqual(d, "1");
    done();
  });
});
