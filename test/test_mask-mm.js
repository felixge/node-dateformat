var assert = require("assert");
var dateFormat = require("../lib/dateformat");

describe("Mask: 'mm'", function () {
  it("should format '2014-11-17' as '11'", function (done) {
    let date = new Date("2014-11-17");
    var d = dateFormat(date, "mm");
    assert.strictEqual(d, "11");
    done();
  });

  it("should format '1992-02-11' as '02'", function (done) {
    let date = new Date("1992-02-11");
    var d = dateFormat(date, "mm");
    assert.strictEqual(d, "02");
    done();
  });

  it("should format '2077-01-25' as '01'", function (done) {
    let date = new Date("2077-01-25");
    var d = dateFormat(date, "mm");
    assert.strictEqual(d, "01");
    done();
  });
});
