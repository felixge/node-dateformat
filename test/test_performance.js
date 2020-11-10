var assert = require("assert");
var dateFormat = require("./../lib/dateformat");

describe("Performance Testing", function () {
  it("should run 1,000,000 operations quicker than 10 seconds", function () {
    this.timeout(10 * 60 * 1_000);

    var startTime = new Date();
    var date = new Date();
    for (var i = 0; i < 1_000_000; i++) {
      dateFormat(date, "ddd, dd mmm yyyy HH:MM:ss Z");
    }
    var endTime = new Date();
    var runTime = endTime - startTime;
    assert.strictEqual(runTime < 10 * 1_000, true);
  });
});
