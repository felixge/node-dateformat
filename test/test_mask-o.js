var assert = require("assert");
var dateFormat = require("../lib/dateformat");

describe("Mask: 'o'", function () {
  it("should get timezone for any date as something like [+-]XXXX", function (done) {
    var date = new Date();
    var d = dateFormat(date, "o");
    assert.ok(d.match(/^[+-]\d{4}$/), d);
    done();
  });
});
