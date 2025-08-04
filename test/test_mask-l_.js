import { describe, it } from "node:test";
import { strictEqual } from 'node:assert';
import dateFormat from "../lib/dateformat.js";

describe("Mask: 'L'", function () {
  it("should format '2020-10-10T08:48:02.436' as '44'", () => {
    var date = new Date("2020-10-10T08:48:02.436");
    var d = dateFormat(date, "L");
    strictEqual(d, "43");
  });

  it("should format '1993-02-16T14:22:12.654' as '65'", () => {
    var date = new Date("1993-02-16T14:22:12.654");
    var d = dateFormat(date, "L");
    strictEqual(d, "65");
  });

  it("should format '2076-01-03T18:23:30.064' as '06'", () => {
    var d = dateFormat("2076-01-03T18:23:30.064", "L");
    strictEqual(d, "06");
  });

  it("should format '2002-12-25T19:35:55.655' as '66'", () => {
    var d = dateFormat("2002-12-25T19:35:55.655", "L");
    strictEqual(d, "65");
  });

  it("should format '2126-07-23T03:15:25.999' as '99'", () => {
    var d = dateFormat("2126-07-23T03:15:25.999", "L");
    strictEqual(d, "99");
  });
});
