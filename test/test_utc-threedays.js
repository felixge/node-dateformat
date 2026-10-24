import { deepStrictEqual, strictEqual } from "node:assert";
import { spawnSync } from "node:child_process";

const moduleUrl = new URL("../lib/dateformat.js", import.meta.url).href;
const utcFormats = [["UTC:DDD DDDD"], ["GMT:DDD DDDD"], ["DDD DDDD", true]];

function formatInTimezone(timezone, now, dates, formats = utcFormats) {
  const source = `import dateFormat from ${JSON.stringify(moduleUrl)};
    const RealDate = Date;
    globalThis.Date = class extends RealDate {
      constructor(...args) {
        super(...(args.length ? args : [${JSON.stringify(now)}]));
      }
      static now() {
        return new RealDate(${JSON.stringify(now)}).getTime();
      }
    };
    const formats = ${JSON.stringify(formats)};
    console.log(JSON.stringify(${JSON.stringify(dates)}.map(value =>
      formats.map(([mask, utc]) => dateFormat(new Date(value), mask, utc))
    )));`;
  const result = spawnSync(process.execPath, ["--input-type=module", "-e", source], {
    env: { ...process.env, TZ: timezone },
    encoding: "utf8",
    timeout: 5000
  });
  strictEqual(result.status, 0, result.stderr);
  return JSON.parse(result.stdout);
}

describe("UTC relative day names", function () {
  const cases = [
    {
      name: "uses UTC yesterday and tomorrow when local time is one day behind",
      timezone: "America/Los_Angeles",
      now: "2024-06-10T00:30:00Z",
      dates: [
        "2024-06-08T00:30:00Z",
        "2024-06-09T00:30:00Z",
        "2024-06-10T00:30:00Z",
        "2024-06-11T00:30:00Z",
        "2024-06-12T00:30:00Z"
      ],
      expected: ["Sat Saturday", "Ysd Yesterday", "Tdy Today", "Tmw Tomorrow", "Wed Wednesday"]
    },
    {
      name: "uses UTC yesterday and tomorrow when local time is one day ahead",
      timezone: "Asia/Tokyo",
      now: "2024-06-10T20:30:00Z",
      dates: [
        "2024-06-08T20:30:00Z",
        "2024-06-09T20:30:00Z",
        "2024-06-10T20:30:00Z",
        "2024-06-11T20:30:00Z",
        "2024-06-12T20:30:00Z"
      ],
      expected: ["Sat Saturday", "Ysd Yesterday", "Tdy Today", "Tmw Tomorrow", "Wed Wednesday"]
    },
    {
      name: "handles the UTC year boundary when the local year differs",
      timezone: "America/Los_Angeles",
      now: "2024-01-01T00:30:00Z",
      dates: ["2023-12-31T00:30:00Z", "2024-01-01T00:30:00Z", "2024-01-02T00:30:00Z"],
      expected: ["Ysd Yesterday", "Tdy Today", "Tmw Tomorrow"]
    },
    {
      name: "handles the UTC month boundary when the local month differs",
      timezone: "Asia/Tokyo",
      now: "2024-01-31T20:30:00Z",
      dates: ["2024-01-30T20:30:00Z", "2024-01-31T20:30:00Z", "2024-02-01T20:30:00Z"],
      expected: ["Ysd Yesterday", "Tdy Today", "Tmw Tomorrow"]
    }
  ];

  for (const { name, timezone, now, dates, expected } of cases) {
    it(name, function () {
      const output = formatInTimezone(timezone, now, dates);
      deepStrictEqual(output, expected.map(label => utcFormats.map(() => label)));
    });
  }
});

describe("Local relative day names across daylight saving transitions", function () {
  const cases = [
    {
      name: "uses local calendar days when daylight saving time starts",
      now: "2024-03-10T16:00:00Z",
      dates: [
        "2024-03-08T17:00:00Z",
        "2024-03-09T17:00:00Z",
        "2024-03-10T16:00:00Z",
        "2024-03-11T16:00:00Z",
        "2024-03-12T16:00:00Z"
      ]
    },
    {
      name: "uses local calendar days when daylight saving time ends",
      now: "2024-11-03T17:00:00Z",
      dates: [
        "2024-11-01T16:00:00Z",
        "2024-11-02T16:00:00Z",
        "2024-11-03T17:00:00Z",
        "2024-11-04T17:00:00Z",
        "2024-11-05T17:00:00Z"
      ]
    }
  ];

  for (const { name, now, dates } of cases) {
    it(name, function () {
      const output = formatInTimezone("America/New_York", now, dates, [["DDD DDDD"]]);
      const expected = ["Fri Friday", "Ysd Yesterday", "Tdy Today", "Tmw Tomorrow", "Tue Tuesday"];
      deepStrictEqual(output, expected.map(label => [label]));
    });
  }
});
