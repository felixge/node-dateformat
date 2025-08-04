import { describe, it } from "node:test";
import { strictEqual } from 'node:assert';
import dateFormat from "../lib/dateformat.js";

describe("Mask: 'N'", function () {
  it("should format '1984-02-7' as '2'", () => {
    var date = new Date("1984-02-7");
    var d = dateFormat(date, "N");
    strictEqual(d, "2");
  });

  it("should format '2013-01-17' as '4'", () => {
    var date = new Date("2013-01-17");
    var d = dateFormat(date, "N");
    strictEqual(d, "4");
  });

  it("should format '2034-11-24' as '5'", () => {
    var d = dateFormat("2034-11-24", "N");
    strictEqual(d, "5");
  });

  it("should format '2002-02-3' as '7'", () => {
    var d = dateFormat("2002-02-3", "N");
    strictEqual(d, "7");
  });

  it("should format '2002-02-4' as '1'", () => {
    var d = dateFormat("2002-02-4", "N");
    strictEqual(d, "1");
  });
});
