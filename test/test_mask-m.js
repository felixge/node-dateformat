import { describe, it } from "node:test";
import { strictEqual } from 'node:assert';
import dateFormat from "../lib/dateformat.js";

describe("Mask: 'm'", function () {
  it("should format '1974-02-7' as '2'", () => {
    var date = new Date("1974-02-7");
    var d = dateFormat(date, "m");
    strictEqual(d, "2");
  });

  it("should format '1992-09-03' as '9'", () => {
    var date = new Date("1992-09-03");
    var d = dateFormat(date, "m");
    strictEqual(d, "9");
  });

  it("should format '2043-12-22' as '12'", () => {
    var date = new Date("2043-12-22");
    var d = dateFormat(date, "m");
    strictEqual(d, "12");
  });

  it("should format '1800-01-01' as '1'", () => {
    var date = new Date("1800-01-01");
    var d = dateFormat(date, "m");
    strictEqual(d, "1");
  });
});
