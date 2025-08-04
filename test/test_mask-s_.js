import { describe, it } from "node:test";
import { strictEqual } from 'node:assert';
import dateFormat from "../lib/dateformat.js";

describe("Mask: 'S'", function () {
  it("should format '1984-02-7' as 'th'", () => {
    var date = new Date("1984-02-7");
    var d = dateFormat(date, "S");
    strictEqual(d, "th");
  });

  it("should format '2013-01-3' as 'rd'", () => {
    var date = new Date("2013-01-3");
    var d = dateFormat(date, "S");
    strictEqual(d, "rd");
  });

  it("should format '2034-11-22' as 'nd'", () => {
    var d = dateFormat("2034-11-22", "S");
    strictEqual(d, "nd");
  });

  it("should format '2002-02-1' as 'st'", () => {
    var d = dateFormat("2002-02-1", "S");
    strictEqual(d, "st");
  });

  it("should format '2002-03-31' as 'st'", () => {
    var d = dateFormat("2002-03-31", "S");
    strictEqual(d, "st");
  });
});
