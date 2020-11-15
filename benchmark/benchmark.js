var previousDateFormat = require("./previousDateFormat");
var newDateFormat = require("../lib/dateformat");

const masks = [
  "d",
  "W",
  "o",
  "N",
  "shortDate",
  "fullDate",
  "longTime",
  "default",
];
let results = [];

masks.forEach((mask) => {
  const previousSpeed = getSpeed(false, mask);
  const newSpeed = getSpeed(true, mask);
  results.push({
    mask: mask,
    previous: previousSpeed + "ms",
    new: newSpeed + "ms",
    improvement: Math.round((previousSpeed / newSpeed - 1) * 100, 2) + "%",
  });
});

function getSpeed(newVersion, mask) {
  const startTime = new Date();
  const date = new Date();
  for (var i = 0; i < 100_000; i++) {
    if (newVersion) newDateFormat(date, mask);
    else previousDateFormat(date, mask);
  }
  const endTime = new Date();
  return endTime - startTime;
}

console.table(results);
