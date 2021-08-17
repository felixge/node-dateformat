import { strictEqual } from "node:assert";
import dateFormat from "../lib/dateformat.js";

describe("Mask: 'M'", function () {
  it("should format '1993-02-12T17:36:01.128' as '36'", function (done) {
    var date = new Date("1993-02-12T17:36:01.128");
    var d = dateFormat(date, "M");
    strictEqual(d, "36");
    done();
  });

  it("should format '2013-11-02T07:00:54.270' as '0'", function (done) {
    var date = new Date("2013-11-02T07:00:54.270");
    var d = dateFormat(date, "M");
    strictEqual(d, "0");
    done();
  });

  it("should format '1873-01-04T11:11:34.700' as '11'", function (done) {
    var d = dateFormat("1873-01-04T11:11:34.700", "M");
    strictEqual(d, "11");
    done();
  });

  it("should format '1734-12-07T09:05:07.972' as '5'", function (done) {
    var d = dateFormat("1734-12-07T09:05:07.972", "M");
    strictEqual(d, "5");
    done();
  });
});
