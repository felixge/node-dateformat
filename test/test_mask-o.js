import { ok } from "node:assert";
import dateFormat from "../lib/dateformat.js";

describe("Mask: 'o'", function () {
  it("should get timezone for any date as something like [+-]XXXX", function (done) {
    var date = new Date();
    var d = dateFormat(date, "o");
    ok(d.match(/^[+-]\d{4}$/), d);
    done();
  });
});
