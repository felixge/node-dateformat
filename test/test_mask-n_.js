var assert = require("assert");
var dateFormat = require("../lib/dateformat");

describe("Mask: 'N'", function () {
  it("should format '1984-02-7' as '2'", function (done) {
    var date = new Date("1984-02-7");
    var d = dateFormat(date, "N");
    assert.strictEqual(d, "2");
    done();
  });

  it("should format '2013-01-17' as '4'", function (done) {
    var date = new Date("2013-01-17");
    var d = dateFormat(date, "N");
    assert.strictEqual(d, "4");
    done();
  });

  it("should format '2034-11-24' as '5'", function (done) {
    var d = dateFormat("2034-11-24", "N");
    assert.strictEqual(d, "5");
    done();
  });

  it("should format '2002-02-3' as '7'", function (done) {
    var d = dateFormat("2002-02-3", "N");
    assert.strictEqual(d, "7");
    done();
  });

  it("should format '2002-02-4' as '1'", function (done) {
    var d = dateFormat("2002-02-4", "N");
    assert.strictEqual(d, "1");
    done();
  });
});
