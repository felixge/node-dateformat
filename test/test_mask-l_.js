var assert = require("assert");
var dateFormat = require("../lib/dateformat");

describe("Mask: 'L'", function () {
  it("should format '2020-10-10T08:48:02.436' as '44'", function (done) {
    let date = new Date("2020-10-10T08:48:02.436");
    var d = dateFormat(date, "L");
    assert.strictEqual(d, "44");
    done();
  });

  it("should format '1993-02-16T14:22:12.654' as '65'", function (done) {
    let date = new Date("1993-02-16T14:22:12.654");
    var d = dateFormat(date, "L");
    assert.strictEqual(d, "65");
    done();
  });

  it("should format '2076-01-03T18:23:30.064' as '06'", function (done) {
    var d = dateFormat("2076-01-03T18:23:30.064", "L");
    assert.strictEqual(d, "06");
    done();
  });

  it("should format '2002-12-25T19:35:55.655' as '66'", function (done) {
    var d = dateFormat("2002-12-25T19:35:55.655", "L");
    assert.strictEqual(d, "66");
    done();
  });
});
