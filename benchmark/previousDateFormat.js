"use strict";

function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === "function" &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? "symbol"
        : typeof obj;
    };
  }
  return _typeof(obj);
}

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
 * The mask defaults to dateFormat.masks.default.
 */
(function (global) {
  "use strict";

  var dateFormat = (function () {
    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|"[^"]*"|'[^']*'/g;
    var timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
    var timezoneClip = /[^-+\dA-Z]/g; // Regexes and supporting functions are cached through closure

    return function (date, mask, utc, gmt) {
      // You can't provide utc if you skip other args (use the 'UTC:' mask prefix)
      if (
        arguments.length === 1 &&
        kindOf(date) === "string" &&
        !/\d/.test(date)
      ) {
        mask = date;
        date = undefined;
      }

      date = date || new Date();

      if (!(date instanceof Date)) {
        date = new Date(date);
      }

      if (isNaN(date)) {
        throw TypeError("Invalid date");
      }

      mask = String(
        dateFormat.masks[mask] || mask || dateFormat.masks["default"]
      ); // Allow setting the utc/gmt argument via the mask

      var maskSlice = mask.slice(0, 4);

      if (maskSlice === "UTC:" || maskSlice === "GMT:") {
        mask = mask.slice(4);
        utc = true;

        if (maskSlice === "GMT:") {
          gmt = true;
        }
      }

      var _ = function _() {
        return utc ? "getUTC" : "get";
      };

      var _d = function d() {
        return date[_() + "Date"]();
      };

      var D = function D() {
        return date[_() + "Day"]();
      };

      var _m = function m() {
        return date[_() + "Month"]();
      };

      var y = function y() {
        return date[_() + "FullYear"]();
      };

      var _H = function H() {
        return date[_() + "Hours"]();
      };

      var _M = function M() {
        return date[_() + "Minutes"]();
      };

      var _s = function s() {
        return date[_() + "Seconds"]();
      };

      var _L = function L() {
        return date[_() + "Milliseconds"]();
      };

      var _o = function o() {
        return utc ? 0 : date.getTimezoneOffset();
      };

      var _W = function W() {
        return getWeek(date);
      };

      var _N = function N() {
        return getDayOfWeek(date);
      };

      var flags = {
        d: function d() {
          return _d();
        },
        dd: function dd() {
          return pad(_d());
        },
        ddd: function ddd() {
          return dateFormat.i18n.dayNames[D()];
        },
        dddd: function dddd() {
          return dateFormat.i18n.dayNames[D() + 7];
        },
        m: function m() {
          return _m() + 1;
        },
        mm: function mm() {
          return pad(_m() + 1);
        },
        mmm: function mmm() {
          return dateFormat.i18n.monthNames[_m()];
        },
        mmmm: function mmmm() {
          return dateFormat.i18n.monthNames[_m() + 12];
        },
        yy: function yy() {
          return String(y()).slice(2);
        },
        yyyy: function yyyy() {
          return y();
        },
        h: function h() {
          return _H() % 12 || 12;
        },
        hh: function hh() {
          return pad(_H() % 12 || 12);
        },
        H: function H() {
          return _H();
        },
        HH: function HH() {
          return pad(_H());
        },
        M: function M() {
          return _M();
        },
        MM: function MM() {
          return pad(_M());
        },
        s: function s() {
          return _s();
        },
        ss: function ss() {
          return pad(_s());
        },
        l: function l() {
          return pad(_L(), 3);
        },
        L: function L() {
          return pad(Math.round(_L() / 10));
        },
        t: function t() {
          return _H() < 12
            ? dateFormat.i18n.timeNames[0]
            : dateFormat.i18n.timeNames[1];
        },
        tt: function tt() {
          return _H() < 12
            ? dateFormat.i18n.timeNames[2]
            : dateFormat.i18n.timeNames[3];
        },
        T: function T() {
          return _H() < 12
            ? dateFormat.i18n.timeNames[4]
            : dateFormat.i18n.timeNames[5];
        },
        TT: function TT() {
          return _H() < 12
            ? dateFormat.i18n.timeNames[6]
            : dateFormat.i18n.timeNames[7];
        },
        Z: function Z() {
          return gmt
            ? "GMT"
            : utc
            ? "UTC"
            : (String(date).match(timezone) || [""])
                .pop()
                .replace(timezoneClip, "")
                .replace(/GMT\+0000/g, "UTC");
        },
        o: function o() {
          return (
            (_o() > 0 ? "-" : "+") +
            pad(
              Math.floor(Math.abs(_o()) / 60) * 100 + (Math.abs(_o()) % 60),
              4
            )
          );
        },
        S: function S() {
          return ["th", "st", "nd", "rd"][
            _d() % 10 > 3 ? 0 : (((_d() % 100) - (_d() % 10) != 10) * _d()) % 10
          ];
        },
        W: function W() {
          return _W();
        },
        N: function N() {
          return _N();
        },
      };
      return mask.replace(token, function (match) {
        if (match in flags) {
          return flags[match]();
        }

        return match.slice(1, match.length - 1);
      });
    };
  })();

  dateFormat.masks = {
    default: "ddd mmm dd yyyy HH:MM:ss",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:sso",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",
    expiresHeaderFormat: "ddd, dd mmm yyyy HH:MM:ss Z",
  }; // Internationalization strings

  dateFormat.i18n = {
    dayNames: [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    monthNames: [
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
  };

  function pad(val, len) {
    val = String(val);
    len = len || 2;

    while (val.length < len) {
      val = "0" + val;
    }

    return val;
  }
  /**
   * Get the ISO 8601 week number
   * Based on comments from
   * http://techblog.procurios.nl/k/n618/news/view/33796/14863/Calculate-ISO-8601-week-and-year-in-javascript.html
   *
   * @param  {Object} `date`
   * @return {Number}
   */

  function getWeek(date) {
    // Remove time components of date
    var targetThursday = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    ); // Change date to Thursday same week

    targetThursday.setDate(
      targetThursday.getDate() - ((targetThursday.getDay() + 6) % 7) + 3
    ); // Take January 4th as it is always in week 1 (see ISO 8601)

    var firstThursday = new Date(targetThursday.getFullYear(), 0, 4); // Change date to Thursday same week

    firstThursday.setDate(
      firstThursday.getDate() - ((firstThursday.getDay() + 6) % 7) + 3
    ); // Check if daylight-saving-time-switch occurred and correct for it

    var ds =
      targetThursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
    targetThursday.setHours(targetThursday.getHours() - ds); // Number of weeks between target Thursday and first Thursday

    var weekDiff = (targetThursday - firstThursday) / (86400000 * 7);
    return 1 + Math.floor(weekDiff);
  }
  /**
   * Get ISO-8601 numeric representation of the day of the week
   * 1 (for Monday) through 7 (for Sunday)
   *
   * @param  {Object} `date`
   * @return {Number}
   */

  function getDayOfWeek(date) {
    var dow = date.getDay();

    if (dow === 0) {
      dow = 7;
    }

    return dow;
  }
  /**
   * kind-of shortcut
   * @param  {*} val
   * @return {String}
   */

  function kindOf(val) {
    if (val === null) {
      return "null";
    }

    if (val === undefined) {
      return "undefined";
    }

    if (_typeof(val) !== "object") {
      return _typeof(val);
    }

    if (Array.isArray(val)) {
      return "array";
    }

    return {}.toString.call(val).slice(8, -1).toLowerCase();
  }

  if (typeof define === "function" && define.amd) {
    define(function () {
      return dateFormat;
    });
  } else if (
    (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ===
    "object"
  ) {
    module.exports = dateFormat;
  } else {
    global.dateFormat = dateFormat;
  }
})(void 0);
