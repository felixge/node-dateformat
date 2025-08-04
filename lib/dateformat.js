// @ts-check
'use strict';

/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to masks.default.
*/

const hasNoNumberRE = /^[^\d]+$/;
const token = /d{1,4}|D{3,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|W{1,2}|[LlopSZN]|"[^"]*"|'[^']*'/g;
const timezone = /\b(?:[A-Z]{1,3}[A-Z][TC])(?:[-+]\d{4})?|((?:Australian )?(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time)\b/g;
const timezoneClip = /[^-+\dA-Z]/g;

const UTC_FNS = {
  getDate: Date.prototype.getUTCDate.call.bind(Date.prototype.getUTCDate),
  getDay: Date.prototype.getUTCDay.call.bind(Date.prototype.getUTCDay),
  getMonth: Date.prototype.getUTCMonth.call.bind(Date.prototype.getUTCMonth),
  getFullYear: Date.prototype.getUTCFullYear.call.bind(Date.prototype.getUTCFullYear),
  getHours: Date.prototype.getUTCHours.call.bind(Date.prototype.getUTCHours),
  getMinutes: Date.prototype.getUTCMinutes.call.bind(Date.prototype.getUTCMinutes),
  getSeconds: Date.prototype.getUTCSeconds.call.bind(Date.prototype.getUTCSeconds),
  getMilliseconds: Date.prototype.getUTCMilliseconds.call.bind(Date.prototype.getUTCMilliseconds),
  getTimezoneOffset: () => 0, // UTC does not have a timezone offset
}

const GMT_FNS = {
  getDate: Date.prototype.getDate.call.bind(Date.prototype.getDate),
  getDay: Date.prototype.getDay.call.bind(Date.prototype.getDay),
  getMonth: Date.prototype.getMonth.call.bind(Date.prototype.getMonth),
  getFullYear: Date.prototype.getFullYear.call.bind(Date.prototype.getFullYear),
  getHours: Date.prototype.getHours.call.bind(Date.prototype.getHours),
  getMinutes: Date.prototype.getMinutes.call.bind(Date.prototype.getMinutes),
  getSeconds: Date.prototype.getSeconds.call.bind(Date.prototype.getSeconds),
  getMilliseconds: Date.prototype.getUTCMilliseconds.call.bind(Date.prototype.getUTCMilliseconds),
  getTimezoneOffset: Date.prototype.getTimezoneOffset.call.bind(Date.prototype.getTimezoneOffset),
}

const microsecondsPerWeek = 604800000; // 7 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds

/**
 * @param {number} value 
 * @returns {number}
 */
const abs = (value) => (value ^ (value >> 31)) - (value >> 31)

const validFlags = /** @type {const} */ ([
  'd', 'dd', 'ddd', 'dddd', 'DDD', 'DDDD',
  'm', 'mm', 'mmm', 'mmmm',
  'yy', 'yyyy',
  'h', 'hh', 'H', 'HH',
  'M', 'MM',
  's', 'ss',
  'l', 'L',
  't', 'tt', 'T', 'TT',
  'Z',
  'o', // timezone offset
  'p', // timezone offset with colon
  'S', // day suffix
  'W', // ISO week number
  'WW', // ISO week number padded
  'N' // ISO day of the week
]);

/** @type {Set<typeof validFlags[number]>} */
const validFlagsSet = new Set(validFlags);

/**
 * @param {string | number | Date} date
 * @param {string} mask
 * @param {boolean} utc
 * @param {boolean} gmt
 */
export default function dateFormat(date, mask, utc, gmt) {
  // You can't provide utc if you skip other args (use the 'UTC:' mask prefix)
  if (date instanceof Date) {
    if (Number.isNaN(date.getTime())) {
      throw TypeError("Invalid date");
    }
  } else if (date || date === 0) {
    if (
      typeof date === "string" &&
      hasNoNumberRE.test(date)
    ) {
      mask = date;
      date = new Date();
    } else {
      date = new Date(date);

      if (Number.isNaN(date.getTime())) {
        throw TypeError("Invalid date");
      }
    }
  } else {
    date = new Date();
  }

  if (mask) {
    if (maskNamesSet.has(/** @type {*} */ (mask))) {
      if (mask === 'isoUtcDateTime') {
        utc = true;
      }
    } else {
      // Allow setting the utc/gmt argument via the mask
      if (mask[3] === ":") {
        if (
          mask[0] === "U" &&
          mask[1] === "T" &&
          mask[2] === "C"
        ) {
          utc = true;
          mask = mask.slice(4);
        } else if (
          mask[0] === "G" &&
          mask[1] === "M" &&
          mask[2] === "T"
        ) {
          gmt = true;
          mask = mask.slice(4);
        }
      }
    }
  } else {
    mask = masks.default;
  }

  const _ = utc ? UTC_FNS : GMT_FNS;
  const d = () => _.getDate(date);
  const D = () => _.getDay(date);
  const m = () => _.getMonth(date);
  const y = () => _.getFullYear(date);
  const H = () => _.getHours(date);
  const M = () => _.getMinutes(date);
  const s = () => _.getSeconds(date);
  const L = () => _.getMilliseconds(date);
  const o = () => _.getTimezoneOffset(date);
  const W = () => getWeek(date);
  const N = () => getDayOfWeek(date);

  /** @type {Record<typeof validFlags[number], () => string>} */
  const flags = {
    d: () => NO_PAD[d()],
    dd: () => PAD_2[d()],
    ddd: () => i18n.dayNamesShort[D()],
    DDD: () => getDayName({
      date,
      D: D,
      short: true
    }),
    dddd: () => i18n.dayNamesLong[D()],
    DDDD: () => getDayName({
      date,
      D: D,
      short: false
    }),
    m: () => NO_PAD[m() + 1],
    mm: () => PAD_2[m() + 1],
    mmm: () => i18n.monthNamesShort[m()],
    mmmm: () => i18n.monthNamesLong[m()],
    yy: () => PAD_2[y() % 100],
    yyyy: () => PAD_4[y()],
    h: () => HOURS_H[H()],
    hh: () => PAD_2[(H() % 12 || 12)],
    H: () => NO_PAD[H()],
    HH: () => PAD_2[H()],
    M: () => NO_PAD[M()],
    MM: () => PAD_2[M()],
    s: () => NO_PAD[s()],
    ss: () => PAD_2[s()],
    l: () => PAD_3[L()],
    L: () => MILLISECONDS_L[L()],
    t: () =>
      H() < 12
        ? i18n.timeNames[0]
        : i18n.timeNames[1],
    tt: () =>
      H() < 12
        ? i18n.timeNames[2]
        : i18n.timeNames[3],
    T: () =>
      H() < 12
        ? i18n.timeNames[4]
        : i18n.timeNames[5],
    TT: () =>
      H() < 12
        ? i18n.timeNames[6]
        : i18n.timeNames[7],
    Z: () =>
      gmt
        ? "GMT"
        : utc
          ? "UTC"
          : formatTimezone(date),
    o: () => {
      const timezoneOffset = o();
      return (timezoneOffset > 0 ? "-" : "+") +
        PAD_4[abs((timezoneOffset) / 60) * 100 + (abs(timezoneOffset) % 60)]
    },
    p: () => {
      const timezoneOffset = o();
      return (timezoneOffset > 0 ? "-" : "+") +
        PAD_2[abs((timezoneOffset) / 60)] +
        ":" +
        PAD_2[abs((timezoneOffset) % 60)];
    },
    S: () => { return daySuffix[d()] },
    W: () => NO_PAD[W()],
    WW: () => PAD_2[W()],
    N: () => NO_PAD[N()],
  };

  if (masksFnsMap.has(mask)) {
    return masksFnsMap.get(mask)(flags);
  }
  return mask.replace(token, (flag) => {
    if (validFlagsSet.has(/** @type {*} */ (flag))) {
      return flags[flag]();
    }
    return flag.slice(1, flag.length - 1);
  });
}

const maskNames = /** @type {const} */(['default', 'shortDate', 'paddedShortDate', 'mediumDate', 'longDate', 'fullDate', 'shortTime', 'mediumTime', 'longTime', 'isoDate', 'isoTime', 'isoDateTime', 'isoUtcDateTime', 'expiresHeaderFormat']);

/** @type {Set<typeof maskNames[number]>} */
const maskNamesSet = new Set(maskNames);

export const masks = /** @type {Record<maskNames[number], string>} */ ({
  default: "ddd mmm dd yyyy HH:MM:ss",
  shortDate: "m/d/yy",
  paddedShortDate: "mm/dd/yyyy",
  mediumDate: "mmm d, yyyy",
  longDate: "mmmm d, yyyy",
  fullDate: "dddd, mmmm d, yyyy",
  shortTime: "h:MM TT",
  mediumTime: "h:MM:ss TT",
  longTime: "h:MM:ss TT Z",
  isoDate: "yyyy-mm-dd",
  isoTime: "HH:MM:ss",
  isoDateTime: "yyyy-mm-dd'T'HH:MM:sso",
  isoUtcDateTime: "yyyy-mm-dd'T'HH:MM:ss'Z'",
  expiresHeaderFormat: "ddd, dd mmm yyyy HH:MM:ss Z",
});

/** @type {Map<string, (flags: Record<typeof validFlags[number], () => string>) => string>} */
const masksFnsMap = new Map();
masksFnsMap.set("default", ({ ddd, mmm, dd, yyyy, HH, MM, ss}) => `${ddd()} ${mmm()} ${dd()} ${yyyy()} ${HH()}:${MM()}:${ss()}`);
masksFnsMap.set("shortDate", ({m, d, yy}) => `${m()}/${d()}/${yy()}`);
masksFnsMap.set("paddedShortDate", ({mm, dd, yyyy}) => `${mm()}/${dd()}/${yyyy()}`);
masksFnsMap.set("mediumDate", ({ mmm, d, yyyy}) => `${mmm()} ${d()}, ${yyyy()}`);
masksFnsMap.set("longDate", ({mmmm, d, yyyy}) => `${mmmm()} ${d()}, ${yyyy()}`);
masksFnsMap.set("fullDate", ({dddd, mmmm, d,yyyy}) => `${dddd()}, ${mmmm()} ${d()}, ${yyyy()}`);
masksFnsMap.set("shortTime", ({h, MM, TT}) => `${h()}:${MM()} ${TT()}`);
masksFnsMap.set("mediumTime", ({h, MM, ss, TT}) => `${h()}:${MM()}:${ss()} ${TT()}`);
masksFnsMap.set("longTime", ({h, MM, ss, TT, Z}) => `${h()}:${MM()}:${ss()} ${TT()} ${Z()}`);
masksFnsMap.set("isoDate", ({yyyy, mm, dd}) => `${yyyy()}-${mm()}-${dd()}`);
masksFnsMap.set("isoTime", ({HH, MM, ss}) => `${HH()}:${MM()}:${ss()}`);
masksFnsMap.set("isoDateTime", ({yyyy, mm, dd, HH, MM, ss, o}) => `${yyyy()}-${mm()}-${dd()}T${HH()}:${MM()}:${ss()}${o()}`);
masksFnsMap.set("isoUtcDateTime", ({ yyyy, mm, dd, HH, MM, ss}) => `${yyyy()}-${mm()}-${dd()}T${HH()}:${MM()}:${ss()}Z`);
masksFnsMap.set("expiresHeaderFormat", ({dd, ddd, mmm, yyyy, HH, MM, ss, Z}) => `${ddd()}, ${dd()} ${mmm()} ${yyyy()} ${HH()}:${MM()}:${ss()} ${Z()}`);

// Internationalization strings
export let i18n = /** @type {const} */ ({
  dayNamesShort: [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ],
  dayNamesLong: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  monthNamesShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  monthNamesLong: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  timeNames: ["a", "p", "am", "pm", "A", "P", "AM", "PM"],
});

const daySuffix = new Array(32).fill(0).map((_, i) => {
  if (i === 1 || i === 21 || i === 31) {
    return "st";
  } else if (i === 2 || i === 22) {
    return "nd";
  } else if (i === 3 || i === 23) {
    return "rd";
  } else {
    return "th";
  }
});

const NO_PAD = new Array(1e3).fill(0).map((_, i) => String(i));
const PAD_2 = new Array(1e2).fill(0).map((_, i) => String(i).padStart(2, '0'));
const PAD_3 = new Array(1e3).fill(0).map((_, i) => String(i).padStart(3, '0'));
const PAD_4 = new Array(1e4).fill(0).map((_, i) => String(i).padStart(4, '0'));

const HOURS_H = new Array(24).fill(0).map((_, i) => String(i % 12 || 12));
const MILLISECONDS_L = new Array(1e3).fill(0).map((_, i) => String(i).padStart(3, '0').slice(0, 2));

/**
 * Get day name
 * Yesterday, Today, Tomorrow if the date lies within, else fallback to Monday - Sunday
 * @param  {Object} options
 * @param  {Date} options.date - The date
 * @param  {function} options.D - Function to get the day of the week (0-6)
 * @param  {boolean} options.short - Whether to return short names (Tdy, Ysd, Tmw)
 * @return {String}
 */
const getDayName = ({ date, D, short }) => {
  // Get the timestamp of the date in milliseconds, since epoch in UTC
  const dateTimestamp = date.getTime();

  // Get the timestamp of the beginning of today in UTC by using Date.UTC,
  // We use the provided date's year, month, and date, and set hours, minutes,
  // seconds and milliseconds to 0.
  const localNow = new Date();
  const todayBeginTimestamp = new Date(
    localNow.getFullYear(),
    localNow.getMonth(),
    localNow.getDate()
  ).getTime();

  if (dateTimestamp >= todayBeginTimestamp) {
    if (dateTimestamp < (todayBeginTimestamp + 86400000)) { // within 24 hours
      return short ? 'Tdy' : 'Today';
    } else if (dateTimestamp < (todayBeginTimestamp + 172800000)) { // within 48 hours
      return short ? 'Tmw' : 'Tomorrow';
    }
  } else if (dateTimestamp > (todayBeginTimestamp - 86400000)) { // within the last 24 hours
    return short ? 'Ysd' : 'Yesterday';
  }

  return short ? i18n.dayNamesShort[D()] : i18n.dayNamesLong[D()];
};

/**
 * @type {Map<number, Date>}
 */
const firstThursdays = new Map();

/**
 * @type {(1|2|3|4|5|6|7)[]}
 */
const firstDaysOfWeekLookup = [1, 7, 6, 5, 4, 3, 2];

/**
 * @type {(0|1|2|3|4|5|6)[]}
 */
const thursdaySameWeekLookup = [6, 0, 1, 2, 3, 4, 5];

/**
 * Get the ISO 8601 week number
 * Based on comments from
 * http://techblog.procurios.nl/k/n618/news/view/33796/14863/Calculate-ISO-8601-week-and-year-in-javascript.html
 *
 * @param  {Date} `date`
 * @return {Number}
 */
const getWeek = (date) => {
  const Y = date.getFullYear();
  const m = date.getMonth();
  const d = date.getDate();

  // Remove time components of date
  const targetThursday = new Date(
    Y,
    m,
    d
  );

  // Change date to Thursday same week
  targetThursday.setDate(
    d - thursdaySameWeekLookup[targetThursday.getDay()] + 3
  );

  const targetThursdayYear = targetThursday.getFullYear();
  
  let firstThursday = firstThursdays.get(targetThursdayYear);
  if (!firstThursday) {
    // Take January 4th as it is always in week 1 (see ISO 8601)
    firstThursday = new Date(targetThursdayYear, 0, 4);

    // Change date to Thursday same week
    firstThursday.setDate(firstDaysOfWeekLookup[firstThursday.getDay()]);
    firstThursdays.set(targetThursdayYear, firstThursday);
  }

  // Check if daylight-saving-time-switch occurred and correct for it
  const ds =
    targetThursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
  targetThursday.setHours(targetThursday.getHours() - ds);

  // Number of weeks between target Thursday and first Thursday
  const weekDiff = (targetThursday.getTime() - firstThursday.getTime()) / 604800000;
  return 1 + ~~(weekDiff);
};

const dayOfWeekLookup = [7, 1, 2, 3, 4, 5, 6];

/**
 * Get ISO-8601 numeric representation of the day of the week
 * 1 (for Monday) through 7 (for Sunday)
 *
 * @param  {Date} `date`
 * @return {Number}
 */
const getDayOfWeek = (date) => {
  return dayOfWeekLookup[date.getDay()];
};

/**
 * Get proper timezone abbreviation or timezone offset.
 * 
 * This will fall back to `GMT+xxxx` if it does not recognize the
 * timezone within the `timezone` RegEx above. Currently only common
 * American and Australian timezone abbreviations are supported.
 * 
 * @param  {String | Date} date
 * @return {String}
 */
export const formatTimezone = (date) => {
  return (String(date).match(timezone) || [""])
    .pop()
    .replace(timezoneClip, "")
    .replace(/GMT\+0000/g, "UTC");
};
