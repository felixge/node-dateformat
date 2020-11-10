var assert = require("assert");
var dateFormat = require("../lib/dateformat");

describe("Mask: 'dddd'", function () {
  it("should format '1934-11-13' as 'Tuesday'", function (done) {
    var date = new Date("1934-11-13");
    var d = dateFormat(date, "dddd");
    assert.strictEqual(d, "Tuesday");
    done();
  });

  it("should format '1834-01-2' as 'Thursday'", function (done) {
    var date = new Date("1834-01-2");
    var d = dateFormat(date, "dddd");
    assert.strictEqual(d, "Thursday");
    done();
  });

  it("should format '2077-7-22' as 'Thursday'", function (done) {
    var date = new Date("2077-7-22");
    var d = dateFormat(date, "dddd");
    assert.strictEqual(d, "Thursday");
    done();
  });
});
