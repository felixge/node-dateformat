import { strictEqual } from "node:assert";
import dateFormat from "../lib/dateformat.js";

describe("Mask: 'MM'", function () {
  it("should format '1876-07-11T13:19:36.341' as '19'", function (done) {
    var date = new Date("1876-07-11T13:19:36.341");
    var d = dateFormat(date, "MM");
    strictEqual(d, "19");
    done();
  });

  it("should format '2013-01-23T07:08:07.942' as '08'", function (done) {
    var date = new Date("2013-01-23T07:08:07.942");
    var d = dateFormat(date, "MM");
    strictEqual(d, "08");
    done();
  });

  it("should format '1982-12-03T08:04:07.203' as '04'", function (done) {
    var d = dateFormat("1982-12-03T08:04:07.203", "MM");
    strictEqual(d, "04");
    done();
  });

  it("should format '2063-09-03T02:38:08.815' as '38'", function (done) {
    var d = dateFormat("2063-09-03T02:38:08.815", "MM");
    strictEqual(d, "38");
    done();
  });
});
