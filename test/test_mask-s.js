import { strictEqual } from "node:assert";
import dateFormat from "../lib/dateformat.js";

describe("Mask: 's'", function () {
  it("should format '1993-10-08T10:31:40.811' as '40'", function (done) {
    var date = new Date("1993-10-08T10:31:40.811");
    var d = dateFormat(date, "s");
    strictEqual(d, "40");
    done();
  });

  it("should format '2020-10-25T01:29:02.327' as '2'", function (done) {
    var date = new Date("2020-10-25T01:29:02.327");
    var d = dateFormat(date, "s");
    strictEqual(d, "2");
    done();
  });

  it("should format '2003-07-02T01:29:00.327' as '0'", function (done) {
    var d = dateFormat("2003-07-02T01:29:00.327", "s");
    strictEqual(d, "0");
    done();
  });
});
