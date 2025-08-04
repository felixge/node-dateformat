import { describe, it } from "node:test";
import { strictEqual } from 'node:assert';
import dateFormat from "../lib/dateformat.js";

describe("Mask: 'WW'", function () {
  it("should format '1876-01-12' as '02'", () => {
    var date = new Date("1876-01-12");
    var d = dateFormat(date, "WW");
    strictEqual(d, "02");
  });

  it("should format '2013-12-11' as '50'", () => {
    var date = new Date("2013-12-11");
    var d = dateFormat(date, "WW");
    strictEqual(d, "50");
  });

  it("should format '2020-03-04' as '10'", () => {
    var d = dateFormat("2020-03-04", "WW");
    strictEqual(d, "10");
  });

  it("should format '2020-02-01' as '05'", () => {
    var d = dateFormat("2020-02-01", "WW");
    strictEqual(d, "05");
  });
});
