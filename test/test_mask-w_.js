import { describe, it } from "node:test";
import { strictEqual } from 'node:assert';
import dateFormat from "../lib/dateformat.js";

describe("Mask: 'W'", function () {
  it("should format '1876-03-22' as '12'", () => {
    var date = new Date("1876-03-22");
    var d = dateFormat(date, "W");
    strictEqual(d, "12");
  });

  it("should format '2013-12-11' as '50'", () => {
    var date = new Date("2013-12-11");
    var d = dateFormat(date, "W");
    strictEqual(d, "50");
  });

  it("should format '2020-08-29' as '35'", () => {
    var d = dateFormat("2020-08-29", "W");
    strictEqual(d, "35");
  });

  it("should format '2020-09-22' as '39'", () => {
    var d = dateFormat("2020-09-22", "W");
    strictEqual(d, "39");
  });
});
