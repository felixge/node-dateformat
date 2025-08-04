import { Bench } from "tinybench"
import dateFormat from "../lib/dateformat.js";

const masks = [
  "d",
  "W",
  "o",
  "N",
  "H",
  "S",
  "L",
  "yy",
  "yyyy",
  "default",
  "shortDate", "paddedShortDate", "mediumDate", "longDate", "fullDate", "isoDate",
  "shortTime", "mediumTime", "longTime", "isoTime",
  "isoDateTime", "isoUtcDateTime",
  "expiresHeaderFormat"
];

const bench = new Bench({ name: 'simple benchmark', time: 100 })

masks.forEach((mask) => {
  const date = new Date();
  bench.add(mask, () => {
    dateFormat(date, mask);
  });
});

{
  const date = new Date();
  bench.add("DDDD - today", () => {
    dateFormat(date, "DDDD");
  });
}

{
  const date = new Date()
  date.setDate(new Date().getDate() + 1);
  bench.add("DDDD - tomorrow", () => {
    dateFormat(date, "DDDD");
  });
}

{
  const date = new Date()
  date.setDate(new Date().getDate() - 1);
  bench.add("DDDD - yesterday", () => {
    dateFormat(date, "DDDD");
  });
}

await bench.run()

console.log(bench.name)
console.table(bench.table())
