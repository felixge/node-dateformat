import { strictEqual,notStrictEqual } from "node:assert";
import dateFormat from "../lib/dateformat.js";

describe("Mask: 'dd'", function () {
  it("should format '2003-9-11' as '11'", function (done) {
    var date = new Date("2003-9-11");
    var d = dateFormat(date, "dd");
    strictEqual(d, "11");
    done();
  });

  it("should format '1992-02-2' as '02'", function (done) {
    var date = new Date("1992-02-2");
    var d = dateFormat(date, "dd");
    strictEqual(d, "02");
    done();
  });

  it("should format '1032-12-07' as '07'", function (done) {
    var date = new Date("1032-12-07");
    var d = dateFormat(date, "dd");
    strictEqual(d, "07");
    done();
  });

  it("should not format '2077-10-06' as '6'", function (done) {
    var date = new Date("2077-10-06");
    var d = dateFormat(date, "dd");
    notStrictEqual(d, "6");
    done();
  });
});
