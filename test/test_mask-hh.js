import { describe, it } from "node:test";
import { strictEqual } from 'node:assert';
import dateFormat from "../lib/dateformat.js";

describe("Mask: 'hh'", function () {
  it("should format '1987-02-11T11:03:16.637' as '11'", () => {
    var date = new Date("1987-02-11T11:03:16.637");
    var d = dateFormat(date, "hh");
    strictEqual(d, "11");
  });

  it("should format '2014-09-28T04:29:52.509' as '04'", () => {
    var date = new Date("2020-09-28T04:29:52.509");
    var d = dateFormat(date, "hh");
    strictEqual(d, "04");
  });

  it("should format '2001-08-02T19:14:19.263' as '07'", () => {
    var d = dateFormat("2001-08-02T19:14:19.263", "hh");
    strictEqual(d, "07");
  });

  it("should format '1872-01-22T19:26:01.744' as '07'", () => {
    var d = dateFormat("1872-01-22T19:26:01.744", "hh");
    strictEqual(d, "07");
  });
});
