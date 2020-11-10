var assert = require("assert");
var dateFormat = require("../lib/dateformat");

describe("Mask: 'dd'", function () {
  it("should format '2003-9-11' as '11'", function (done) {
    let date = new Date("2003-9-11");
    var d = dateFormat(date, "dd");
    assert.strictEqual(d, "11");
    done();
  });

  it("should format '1992-02-2' as '02'", function (done) {
    let date = new Date("1992-02-2");
    var d = dateFormat(date, "dd");
    assert.strictEqual(d, "02");
    done();
  });

  it("should format '1032-12-07' as '07'", function (done) {
    let date = new Date("1032-12-07");
    var d = dateFormat(date, "dd");
    assert.strictEqual(d, "07");
    done();
  });

  it("should not format '2077-10-06' as '6'", function (done) {
    let date = new Date("2077-10-06");
    var d = dateFormat(date, "dd");
    assert.notStrictEqual(d, "6");
    done();
  });
});
