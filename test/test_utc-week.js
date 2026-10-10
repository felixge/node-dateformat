import { strictEqual } from "node:assert";
import { spawnSync } from "node:child_process";

const moduleUrl = new URL("../lib/dateformat.js", import.meta.url).href;

function formatInTimezone(timezone, date) {
  const source = `import dateFormat from ${JSON.stringify(moduleUrl)};
    const date = new Date(${JSON.stringify(date)});
    console.log(JSON.stringify([
      dateFormat(date, "UTC:yyyy-mm-dd WW N"),
      dateFormat(date, "GMT:yyyy-mm-dd WW N"),
      dateFormat(date, "yyyy-mm-dd WW N", true),
      dateFormat(date, "yyyy-mm-dd WW N")
    ]));`;
  const result = spawnSync(process.execPath, ["--input-type=module", "-e", source], {
    env: { ...process.env, TZ: timezone },
    encoding: "utf8"
  });
  strictEqual(result.status, 0, result.stderr);
  return JSON.parse(result.stdout);
}

describe("UTC ISO week and weekday tokens", function () {
  it("uses the UTC calendar day when local time is on the preceding Sunday", function () {
    const output = formatInTimezone("America/Los_Angeles", "2022-01-03T00:30:00Z");
    strictEqual(output[0], "2022-01-03 01 1");
    strictEqual(output[1], output[0]);
    strictEqual(output[2], output[0]);
    strictEqual(output[3], "2022-01-02 52 7");
  });

  it("uses the UTC calendar day when local time is on the following Monday", function () {
    const output = formatInTimezone("Asia/Tokyo", "2022-01-02T20:30:00Z");
    strictEqual(output[0], "2022-01-02 52 7");
    strictEqual(output[1], output[0]);
    strictEqual(output[2], output[0]);
    strictEqual(output[3], "2022-01-03 01 1");
  });
});
