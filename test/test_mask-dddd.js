import { describe, it } from "node:test";
import { strictEqual } from 'node:assert';
import dateFormat from "../lib/dateformat.js";

describe("Mask: 'dddd'", function () {
  it("should format '1934-11-13' as 'Tuesday'", () => {
    var date = new Date("1934-11-13");
    var d = dateFormat(date, "dddd");
    strictEqual(d, "Tuesday");
  });

  it("should format '1834-01-2' as 'Thursday'", () => {
    var date = new Date("1834-01-2");
    var d = dateFormat(date, "dddd");
    strictEqual(d, "Thursday");
  });

  it("should format '2077-7-22' as 'Thursday'", () => {
    var date = new Date("2077-7-22");
    var d = dateFormat(date, "dddd");
    strictEqual(d, "Thursday");
  });
});
