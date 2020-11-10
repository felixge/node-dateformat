var assert = require("assert");
var dateFormat = require("../lib/dateformat");

describe("Mask: 'l'", function () {
  it("should format '2020-10-10T08:48:02.436' as '436'", function (done) {
    let date = new Date("2020-10-10T08:48:02.436");
    var d = dateFormat(date, "l");
    assert.strictEqual(d, "436");
    done();
  });

  it("should format '1993-02-16T14:22:12.654' as '654'", function (done) {
    let date = new Date("1993-02-16T14:22:12.654");
    var d = dateFormat(date, "l");
    assert.strictEqual(d, "654");
    done();
  });

  it("should format '2076-01-03T18:23:30.064' as '064'", function (done) {
    var d = dateFormat("2076-01-03T18:23:30.064", "l");
    assert.strictEqual(d, "064");
    done();
  });

  it("should format '2002-12-25T19:35:55.655' as '655'", function (done) {
    var d = dateFormat("2002-12-25T19:35:55.655", "l");
    assert.strictEqual(d, "655");
    done();
  });
});
