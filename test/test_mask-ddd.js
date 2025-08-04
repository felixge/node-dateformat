import { describe, it } from "node:test";
import { strictEqual } from 'node:assert';
import dateFormat from "../lib/dateformat.js";

describe("Mask: 'ddd'", function () {
  it("should format '2023-01-07' as 'Sat'", () => {
    var date = new Date("2023-01-07");
    var d = dateFormat(date, "ddd");
    strictEqual(d, "Sat");
  });

  it("should format '1873-12-17' as 'Wed'", () => {
    var date = new Date("1873-12-17");
    var d = dateFormat(date, "ddd");
    strictEqual(d, "Wed");
  });

  it("should format '2112-10-25' as 'Tue'", () => {
    var date = new Date("2112-10-25");
    var d = dateFormat(date, "ddd");
    strictEqual(d, "Tue");
  });
});
