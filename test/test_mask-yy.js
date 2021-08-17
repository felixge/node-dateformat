import { strictEqual } from "node:assert";
import dateFormat from "../lib/dateformat.js";

describe("Mask: 'yy'", function () {
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
