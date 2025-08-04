import { describe, it } from "node:test";
import { strictEqual } from 'node:assert';
import dateFormat from "../lib/dateformat.js";

describe("Mask: 'ss'", function () {
  it("should format '1876-03-22T23:08:02.429' as '02'", () => {
    var date = new Date("1876-03-22T23:08:02.429");
    var d = dateFormat(date, "ss");
    strictEqual(d, "02");
  });

  it("should format '2013-12-11T05:34:35.350' as '35'", () => {
    var date = new Date("2013-12-11T05:34:35.350");
    var d = dateFormat(date, "ss");
    strictEqual(d, "35");
  });

  it("should format '2020-08-29T00:32:00.101' as '00'", () => {
    var d = dateFormat("2020-08-29T00:32:00.101", "ss");
    strictEqual(d, "00");
  });

  it("should format '2020-09-22T07:04:09.358' as '09'", () => {
    var d = dateFormat("2020-09-22T07:04:09.358", "ss");
    strictEqual(d, "09");
  });
});
