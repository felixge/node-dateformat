var assert = require("assert");
var dateFormat = require("../lib/dateformat");

describe("Mask: 'yyyy'", function () {
  it("should format '1992-10-6' as '1992'", function (done) {
    var date = new Date("1992-10-6");
    var d = dateFormat(date, "yyyy");
    assert.strictEqual(d, "1992");
    done();
  });

  it("should format '2078-02-11' as '2078'", function (done) {
    var date = new Date("2078-02-11");
    var d = dateFormat(date, "yyyy");
    assert.strictEqual(d, "2078");
    done();
  });

  it("should format '1763-12-02' as '1763'", function (done) {
    var date = new Date("1763-12-02");
    var d = dateFormat(date, "yyyy");
    assert.strictEqual(d, "1763");
    done();
  });
});
