import { strictEqual } from "node:assert";
import dateFormat from "../lib/dateformat.js";

describe("Mask: 'mmmm'", function () {
  it("should format '1993-02-11' as 'February'", function (done) {
    var date = new Date("1993-02-11");
    var d = dateFormat(date, "mmmm");
    strictEqual(d, "February");
    done();
  });

  it("should format '2023-11-13' as 'November'", function (done) {
    var date = new Date("2023-11-13");
    var d = dateFormat(date, "mmmm");
    strictEqual(d, "November");
    done();
  });

  it("should format '2077-10-01' as 'October'", function (done) {
    var date = new Date("2077-10-01");
    var d = dateFormat(date, "mmmm");
    strictEqual(d, "October");
    done();
  });
});
