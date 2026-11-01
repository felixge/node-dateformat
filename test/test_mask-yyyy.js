import { strictEqual } from "node:assert";
import dateFormat from "../lib/dateformat.js";

describe("Mask: 'yyyy'", function () {
  it("should format '1992-10-6' as '1992'", function (done) {
    var date = new Date("1992-10-6");
    var d = dateFormat(date, "yyyy");
    strictEqual(d, "1992");
    done();
  });

  it("should format '2078-02-11' as '2078'", function (done) {
    var date = new Date("2078-02-11");
    var d = dateFormat(date, "yyyy");
    strictEqual(d, "2078");
    done();
  });

  it("should format '1763-12-02' as '1763'", function (done) {
    var date = new Date("1763-12-02");
    var d = dateFormat(date, "yyyy");
    strictEqual(d, "1763");
    done();
  });

  it("should format '0999-01-01' as '0999'", function (done) {
    var date = new Date("0999-01-01");
    var d = dateFormat(date, "yyyy");
    strictEqual(d, "0999");
    done();
  });

  it("should format '0002-12-11' as '0002'", function (done) {
    var date = new Date("0002-12-11");
    var d = dateFormat(date, "yyyy");
    strictEqual(d, "0002");
    done();
  });

  // https://github.com/felixge/node-dateformat/issues/196
  it("should format negative calendar years with a leading minus", function () {
    for (const [year, expected] of [
      [-1, "-0001"],
      [-7, "-0007"],
      [-42, "-0042"],
      [-123, "-0123"],
      [-10000, "-10000"],
    ]) {
      const localDate = new Date(0);
      localDate.setFullYear(year, 0, 1);
      strictEqual(dateFormat(localDate, "yyyy"), expected);
      const utcDate = new Date(0);
      utcDate.setUTCFullYear(year, 0, 1);
      strictEqual(dateFormat(utcDate, "UTC:yyyy"), expected);
    }
  });
});
