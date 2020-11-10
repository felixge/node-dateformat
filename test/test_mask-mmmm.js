var assert = require("assert");
var dateFormat = require("../lib/dateformat");

describe("Mask: 'mmmm'", function () {
  it("should format '1993-02-11' as 'February'", function (done) {
    var date = new Date("1993-02-11");
    var d = dateFormat(date, "mmmm");
    assert.strictEqual(d, "February");
    done();
  });

  it("should format '2023-11-13' as 'November'", function (done) {
    var date = new Date("2023-11-13");
    var d = dateFormat(date, "mmmm");
    assert.strictEqual(d, "November");
    done();
  });

  it("should format '2077-10-01' as 'October'", function (done) {
    var date = new Date("2077-10-01");
    var d = dateFormat(date, "mmmm");
    assert.strictEqual(d, "October");
    done();
  });
});
