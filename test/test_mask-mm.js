import { describe, it } from "node:test";
import { strictEqual } from 'node:assert';
import dateFormat from "../lib/dateformat.js";

describe("Mask: 'mm'", function () {
  it("should format '2014-11-17' as '11'", () => {
    var date = new Date("2014-11-17");
    var d = dateFormat(date, "mm");
    strictEqual(d, "11");
  });

  it("should format '1992-02-11' as '02'", () => {
    var date = new Date("1992-02-11");
    var d = dateFormat(date, "mm");
    strictEqual(d, "02");
  });

  it("should format '2077-01-25' as '01'", () => {
    var date = new Date("2077-01-25");
    var d = dateFormat(date, "mm");
    strictEqual(d, "01");
  });
});
