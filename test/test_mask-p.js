var assert = require("assert");
var dateFormat = require("../lib/dateformat");

describe("Mask: 'p'", function () {
  it("should get timezone for any date as something like [+-]XX:XX", function (done) {
    var date = new Date();
    var d = dateFormat(date, "p");
    assert.ok(d.match(/^[+-]\d{2}:\d{2}$/), d);
    done();

    console.log( dateFormat(date, "isoDateTime"));
  });
});
