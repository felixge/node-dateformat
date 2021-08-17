import { strictEqual } from "node:assert";
import dateFormat from "../lib/dateformat.js";

describe("Mask: 'mmm'", function () {
  it("should format '2099-1-11' as 'Jan'", function (done) {
    var date = new Date("2099-1-11");
    var d = dateFormat(date, "mmm");
    strictEqual(d, "Jan");
    done();
  });

  it("should format '1982-10-01' as 'Oct'", function (done) {
    var date = new Date("1982-10-01");
    var d = dateFormat(date, "mmm");
    strictEqual(d, "Oct");
    done();
  });

  it("should format '1871-03-22' as 'Mar'", function (done) {
    var date = new Date("1871-03-22");
    var d = dateFormat(date, "mmm");
    strictEqual(d, "Mar");
    done();
  });
});
