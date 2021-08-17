import { strictEqual } from "node:assert";
import dateFormat from "../lib/dateformat.js";

describe("Mask: 'S'", function () {
  it("should format '1984-02-7' as 'th'", function (done) {
    var date = new Date("1984-02-7");
    var d = dateFormat(date, "S");
    strictEqual(d, "th");
    done();
  });

  it("should format '2013-01-3' as 'rd'", function (done) {
    var date = new Date("2013-01-3");
    var d = dateFormat(date, "S");
    strictEqual(d, "rd");
    done();
  });

  it("should format '2034-11-22' as 'nd'", function (done) {
    var d = dateFormat("2034-11-22", "S");
    strictEqual(d, "nd");
    done();
  });

  it("should format '2002-02-1' as 'st'", function (done) {
    var d = dateFormat("2002-02-1", "S");
    strictEqual(d, "st");
    done();
  });
});
