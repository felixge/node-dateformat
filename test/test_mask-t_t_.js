import { strictEqual } from "node:assert";
import dateFormat from "../lib/dateformat.js";

describe("Mask: 'TT'", function () {
  it("should format '1876-04-23T07:35:20.830' as 'AM'", function (done) {
    var date = new Date("1876-04-23T07:35:20.830");
    var d = dateFormat(date, "TT");
    strictEqual(d, "AM");
    done();
  });

  it("should format '2018-04-27T18:50:35.567' as 'PM'", function (done) {
    var date = new Date("2018-04-27T18:50:35.567");
    var d = dateFormat(date, "TT");
    strictEqual(d, "PM");
    done();
  });

  it("should format '2032-05-07T06:45:41.382' as 'AM'", function (done) {
    var d = dateFormat("2032-05-07T06:45:41.382", "TT");
    strictEqual(d, "AM");
    done();
  });

  it("should format '1976-11-25T19:44:08.918' as 'PM'", function (done) {
    var d = dateFormat("1976-11-25T19:44:08.918", "TT");
    strictEqual(d, "PM");
    done();
  });
});
