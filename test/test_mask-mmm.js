import { describe, it } from "node:test";
import { strictEqual } from 'node:assert';
import dateFormat from "../lib/dateformat.js";

describe("Mask: 'mmm'", function () {
  it("should format '2099-1-11' as 'Jan'", () => {
    var date = new Date("2099-1-11");
    var d = dateFormat(date, "mmm");
    strictEqual(d, "Jan");
  });

  it("should format '1982-10-01' as 'Oct'", () => {
    var date = new Date("1982-10-01");
    var d = dateFormat(date, "mmm");
    strictEqual(d, "Oct");
  });

  it("should format '1871-03-22' as 'Mar'", () => {
    var date = new Date("1871-03-22");
    var d = dateFormat(date, "mmm");
    strictEqual(d, "Mar");
  });
});
