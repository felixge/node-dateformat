var assert = require("assert");
var dateFormat = require("../lib/dateformat");

describe("Mask: 'H'", function () {
  it("should format '1883-03-22T07:35:26.419' as '7'", function (done) {
    let date = new Date("1883-03-22T07:35:26.419");
    var d = dateFormat(date, "H");
    assert.strictEqual(d, "7");
    done();
  });

  it("should format '2012-11-07T14:39:48.988' as '14'", function (done) {
    let date = new Date("2012-11-07T14:39:48.988");
    var d = dateFormat(date, "H");
    assert.strictEqual(d, "14");
    done();
  });

  it("should format '1882-01-16T19:37:45.965' as '19'", function (done) {
    var d = dateFormat("1882-01-16T19:37:45.965", "H");
    assert.strictEqual(d, "19");
    done();
  });

  it("should format '2020-08-29T11:20:47.128' as '11'", function (done) {
    var d = dateFormat("2020-08-29T11:20:47.128", "H");
    assert.strictEqual(d, "11");
    done();
  });
});
