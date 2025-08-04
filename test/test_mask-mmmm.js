import { describe, it } from "node:test";
import { strictEqual } from 'node:assert';
import dateFormat from "../lib/dateformat.js";

describe("Mask: 'mmmm'", function () {
  it("should format '1993-02-11' as 'February'", function () {
    var date = new Date("1993-02-11");
    var d = dateFormat(date, "mmmm");
    strictEqual(d, "February");
  });

  it("should format '2023-11-13' as 'November'", function () {
    var date = new Date("2023-11-13");
    var d = dateFormat(date, "mmmm");
    strictEqual(d, "November");
  });

  it("should format '2077-10-01' as 'October'", function () {
    var date = new Date("2077-10-01");
    var d = dateFormat(date, "mmmm");
    strictEqual(d, "October");
  });
});
