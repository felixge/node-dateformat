var assert = require("assert");

var dateFormat = require("./../lib/dateformat");

describe("quoted substrings", function () {
  var az = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  it("should not format single quoted substrings removing quotes", function () {
    var result = dateFormat("'" + az + "'");
    assert.strictEqual(result, az);
  });

  it("should not format double quoted substrings removing quotes", function () {
    var result = dateFormat('"' + az + '"');
    assert.strictEqual(result, az);
  });
});
