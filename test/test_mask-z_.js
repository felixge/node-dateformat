import { strictEqual } from "node:assert";
import { formatTimezone } from "../lib/dateformat.js";

describe("Mask: 'Z'", function () {
  it("should format 'Tue Sep 08 2020 13:26:11 GMT-0500 (Central Daylight Time)' as 'CDT'", function (done) {
    var d = formatTimezone("Tue Sep 08 2020 13:26:11 GMT-0500 (Central Daylight Time)");
    strictEqual(d, "CDT");
    done();
  });

  it("should format 'Tue Sep 08 2020 12:26:11 GMT-0600 (Mountain Daylight Time)' as 'MDT'", function (done) {
    var d = formatTimezone("Tue Sep 08 2020 12:26:11 GMT-0600 (Mountain Daylight Time)");
    strictEqual(d, "MDT");
    done();
  });

  it("should format 'Wed Sep 09 2020 04:28:21 GMT+1000 (Australian Eastern Standard Time)' as 'AEST'", function (done) {
    var d = formatTimezone("Wed Sep 09 2020 04:28:21 GMT+1000 (Australian Eastern Standard Time)");
    strictEqual(d, "AEST");
    done();
  });

  it("should format 'Wed Sep 09 2020 03:56:05 GMT+0930 (Australian Central Standard Time)' as 'ACST'", function (done) {
    var d = formatTimezone("Wed Sep 09 2020 03:56:05 GMT+0930 (Australian Central Standard Time)");
    strictEqual(d, "ACST");
    done();
  });

  it("should format 'Tue Feb 02 2021 09:51:33 GMT+1030 (Australian Central Daylight Time)' as 'ACDT'", function (done) {
    var d = formatTimezone("Tue Feb 02 2021 09:51:33 GMT+1030 (Australian Central Daylight Time)");
    strictEqual(d, "ACDT");
    done();
  });

  /* Since CEST is not currently supported abbreviation we fall back to GMT+xxxx */
  it("should format 'Tue Feb 02 2021 00:21:33 GMT+0100 (Central European Standard Time)' as 'GMT+0100' (fallback)", function (done) {
    var d = formatTimezone("Tue Feb 02 2021 00:21:33 GMT+0100 (Central European Standard Time)");
    strictEqual(d, "GMT+0100");
    done();
  });

  it("should format 'Tue Sep 08 2020 20:26:22 GMT+0200 (Central European Summer Time)' as 'GMT+0200' (fallback)", function (done) {
    var d = formatTimezone("Tue Sep 08 2020 20:26:22 GMT+0200 (Central European Summer Time)");
    strictEqual(d, "GMT+0200");
    done();
  });
});
