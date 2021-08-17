import { strictEqual } from "node:assert";
import dateFormat from "../lib/dateformat.js";

describe("Mask: 't'", function () {
  it("should format '1876-03-22T23:08:02.429' as 'p'", function (done) {
    var date = new Date("1876-03-22T23:08:02.429");
    var d = dateFormat(date, "t");
    strictEqual(d, "p");
    done();
  });

  it("should format '2013-12-11T05:34:35.350' as 'a'", function (done) {
    var date = new Date("2013-12-11T05:34:35.350");
    var d = dateFormat(date, "t");
    strictEqual(d, "a");
    done();
  });

  it("should format '2020-08-29T00:32:00.101' as 'a'", function (done) {
    var d = dateFormat("2020-08-29T00:32:00.101", "t");
    strictEqual(d, "a");
    done();
  });

  it("should format '2020-09-22T23:04:09.358' as 'p'", function (done) {
    var d = dateFormat("2020-09-22T23:04:09.358", "t");
    strictEqual(d, "p");
    done();
  });
});
