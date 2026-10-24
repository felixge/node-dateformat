import { strictEqual } from "node:assert";

import dateFormat from "./../lib/dateformat.js";

describe("UTC: and GMT: prefix with a named mask", function () {
  const date = "2014-06-02T23:23:21-08:00";

  it("should apply the prefix to the named mask", function () {
    strictEqual(dateFormat(date, "UTC:isoDate"), "2014-06-03");
    strictEqual(dateFormat(date, "UTC:isoTime"), "07:23:21");
    strictEqual(dateFormat(date, "GMT:expiresHeaderFormat"), "Tue, 03 Jun 2014 07:23:21 GMT");
  });

  it("should handle a named mask that has a prefix itself", function () {
    strictEqual(dateFormat(date, "GMT:isoUtcDateTime"), "2014-06-03T07:23:21Z");
    strictEqual(dateFormat(date, "isoUtcDateTime"), "2014-06-03T07:23:21Z");
  });

  it("should still treat other masks literally", function () {
    strictEqual(dateFormat(date, "UTC:yyyy-mm-dd"), "2014-06-03");
  });
});
