import { strictEqual } from "node:assert";
import dateFormat from "../lib/dateformat.js";

describe("Mask: 'HH'", function () {
  it("should format '1872-02-01T15:55:16.524' as '15'", function (done) {
    var date = new Date("1872-02-01T15:55:16.524");
    var d = dateFormat(date, "HH");
    strictEqual(d, "15");
    done();
  });

  it("should format '2020-10-08T14:32:24.438' as '14'", function (done) {
    var date = new Date("2020-10-08T14:32:24.438");
    var d = dateFormat(date, "HH");
    strictEqual(d, "14");
    done();
  });

  it("should format '2077-12-24T04:20:55.795' as '04'", function (done) {
    var d = dateFormat("2077-12-24T04:20:55.795", "HH");
    strictEqual(d, "04");
    done();
  });

  it("should format '1782-02-11T01:09:41.403' as '01'", function (done) {
    var d = dateFormat("1782-02-11T01:09:41.403", "HH");
    strictEqual(d, "01");
    done();
  });
});
