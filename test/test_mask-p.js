import { describe, it } from "node:test";
import { ok } from "node:assert";
import dateFormat from "../lib/dateformat.js";

describe("Mask: 'p'", function () {
  it("should get timezone for any date as something like [+-]XX:XX", () => {
    var date = new Date();
    var d = dateFormat(date, "p");
    ok(d.match(/^[+-]\d{2}:\d{2}$/), d);

    console.log( dateFormat(date, "isoDateTime"));
  });
});
