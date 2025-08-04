import { describe, it } from "node:test";
import { strictEqual,notStrictEqual } from "node:assert";
import dateFormat from "../lib/dateformat.js";

describe("Mask: 'd'", function () {
  it("should format '1993-03-12' as '12'", () => {
    var date = new Date("1993-03-12");
    var d = dateFormat(date, "d");
    strictEqual(d, "12");
  });

  it("should format '2020-11-1' as '1'", () => {
    var date = new Date("2020-11-1");
    var d = dateFormat(date, "d");
    strictEqual(d, "1");
  });

  it("should format '1830-01-20' as '20'", () => {
    var date = new Date("1830-01-20");
    var d = dateFormat(date, "d");
    strictEqual(d, "20");
  });

  it("should not format '1830-01-06' as '06'", () => {
    var date = new Date("1830-01-20");
    var d = dateFormat(date, "d");
    notStrictEqual(d, "06");
  });
});
