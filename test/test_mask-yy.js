import { strictEqual } from "node:assert";
import dateFormat from "../lib/dateformat.js";

describe("Mask: 'yy'", function () {
  it("should pad the final two digits for short and expanded years", function () {
    for (const [year, expected] of [[0, "00"], [7, "07"], [42, "42"], [123, "23"], [987, "87"], [10000, "00"]]) {
      const localDate = new Date(0);
      localDate.setFullYear(year, 0, 1);
      strictEqual(dateFormat(localDate, "yy"), expected);
      const utcDate = new Date(0);
      utcDate.setUTCFullYear(year, 0, 1);
      strictEqual(dateFormat(utcDate, "UTC:yy"), expected);
    }
  });

  it("should pad the final two digits for negative calendar years", function () {
    for (const [year, expected] of [[-1, "01"], [-7, "07"], [-9, "09"], [-42, "42"], [-123, "23"], [-10000, "00"]]) {
      const localDate = new Date(0);
      localDate.setFullYear(year, 0, 1);
      strictEqual(dateFormat(localDate, "yy"), expected);
      const utcDate = new Date(0);
      utcDate.setUTCFullYear(year, 0, 1);
      strictEqual(dateFormat(utcDate, "UTC:yy"), expected);
    }
  });

  it("should format '1789-11-12' as '89'", function (done) {
    var date = new Date("1789-11-12");
    var d = dateFormat(date, "yy");
    strictEqual(d, "89");
    done();
  });

  it("should format '2089-10-2' as '89'", function (done) {
    var date = new Date("2089-10-2");
    var d = dateFormat(date, "yy");
    strictEqual(d, "89");
    done();
  });

  it("should format '2000-02-7' as '00'", function (done) {
    var date = new Date("2000-02-7");
    var d = dateFormat(date, "yy");
    strictEqual(d, "00");
    done();
  });

  it("should format '1999-11-27' as '99'", function (done) {
    var date = new Date("1999-11-27");
    var d = dateFormat(date, "yy");
    strictEqual(d, "99");
    done();
  });
});
