var assert = require("assert");
var dateFormat = require("../lib/dateformat");

describe("Mask: 'ddd'", function () {
  it("should format '2023-01-07' as 'Sat'", function (done) {
    var date = new Date("2023-01-07");
    var d = dateFormat(date, "ddd");
    assert.strictEqual(d, "Sat");
    done();
  });

  it("should format '1873-12-17' as 'Wed'", function (done) {
    var date = new Date("1873-12-17");
    var d = dateFormat(date, "ddd");
    assert.strictEqual(d, "Wed");
    done();
  });

  it("should format '2112-10-25' as 'Tue'", function (done) {
    var date = new Date("2112-10-25");
    var d = dateFormat(date, "ddd");
    assert.strictEqual(d, "Tue");
    done();
  });
});
