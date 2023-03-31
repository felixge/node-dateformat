/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 * and Johan Heander <timezynk.com>
 * and Sebastian Jonasson <https://github.com/sebastianjonasson>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

(function(global) {
    'use strict';

    var DEFAULT_ISO_DATE_FORMAT = 'yyyy-mm-dd';
    var DEFAULT_DAY_NAMES = [
        'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ];
    var DEFAULT_MONTH_NAMES = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];
    var DEFAULT_TIME_NAMES =  [
      'a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'
    ];

    var dateFormat = (function() {
        var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTtV])\1?|[LlopSZWNG]|"[^"]*"|'[^']*'/g;
        var iso_wo_tz = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}$/;
        var iso_with_timezone = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}[+-]\d{2}:\d{2}(?:\[[A-Za-z]+\/[A-Za-z]+\])?$/;

        // Regexes and supporting functions are cached through closure
        return function (date, mask, utc, gmt) {

            // You can't provide utc if you skip other args (use the 'UTC:' mask prefix)
            if (arguments.length === 1 && typeof(date) === 'string' && !/\d/.test(date)) {
                mask = date;
                date = undefined;
            }

            date = date || date === 0 ? date : new Date;

            // Given an ISOString w/o timezone safari and chrome will parse new Date differently
            // - Chrome: new Date("2019-01-01T13:00:00.000") -> Tue Jan 01 2019 13:00:00 GMT+0100 (Central European Standard Time)
            // - Safari: new Date("2019-01-01T13:00:00.000") -> Tue Jan 01 2019 14:00:00 GMT+0100 (CET)
            if(typeof date === 'string' && iso_wo_tz.test(date)) {
                var parts = date.replace(/(-|T|:|\.)/g, ' ')
                                .split(' ')
                                .map(function(v) {
                                    return parseInt(v, 10);
                                });

                date = new Date(
                    parts[0],
                    parts[1] - 1, // months are (zero-based index)
                    parts[2],
                    parts[3],
                    parts[4],
                    parts[5],
                    parts[6]
                );
            }

            if(typeof date === 'string' && iso_with_timezone.test(date)) {
                var parts = date.replace(/(-|T|:|\+)/g, ' ')
                                .split(' ')
                                .map(function(v) {
                                    return parseInt(v, 10);
                                });

                date = new Date(
                    parts[0],
                    parts[1] - 1, // months are (zero-based index)
                    parts[2],
                    parts[3],
                    parts[4],
                    parts[5],
                );
            }

            if(!(date instanceof Date)) {
                date = new Date(date);
            }

            if (isNaN(date)) {
                throw TypeError('Invalid date');
            }

            mask = String(dateFormat.masks[mask] || mask || dateFormat.masks['default']);

            // Shortcut for faster iso date formatting
            if (mask === DEFAULT_ISO_DATE_FORMAT) {
                return getISODateString(date);
            }

            // Allow setting the utc/gmt argument via the mask
            var maskSlice = mask.slice(0, 4);
            if (maskSlice === 'UTC:' || maskSlice === 'GMT:') {
                mask = mask.slice(4);
                utc = true;
                if (maskSlice === 'GMT:') {
                    gmt = true;
                }
            }

            var i18nDayNames = (dateFormat.i18n && dateFormat.i18n.dayNames) || DEFAULT_DAY_NAMES;
            var i18nMonthNames = (dateFormat.i18n && dateFormat.i18n.monthNames) || DEFAULT_MONTH_NAMES;
            var i18nTimeNames = (dateFormat.i18n && dateFormat.i18n.timeNames) || DEFAULT_TIME_NAMES;

            var _ = utc ? 'getUTC' : 'get';
            var d = date[_ + 'Date']();
            var D = date[_ + 'Day']();
            var m = date[_ + 'Month']();
            var y = pad(date[_ + 'FullYear'](), 4);
            var H = date[_ + 'Hours']();
            var M = date[_ + 'Minutes']();
            var s = date[_ + 'Seconds']();
            var L = date[_ + 'Milliseconds']();
            var flags = {
                d    : d,
                dd   : pad(d),
                ddd  : i18nDayNames[D],
                dddd : i18nDayNames[D + 7],
                m    : m + 1,
                mm   : pad(m + 1),
                mmm  : i18nMonthNames[m],
                mmmm : i18nMonthNames[m + 12],
                yy   : String(y).slice(2),
                yyyy : y,
                h    : H % 12 || 12,
                hh   : pad(H % 12 || 12),
                H    : H,
                HH   : pad(H),
                M    : M,
                MM   : pad(M),
                s    : s,
                ss   : pad(s),
                l    : pad(L, 3),
                L    : pad(Math.floor(L / 10)),
                t    : H < 12 ? i18nTimeNames[0] : i18nTimeNames[1],
                tt   : H < 12 ? i18nTimeNames[2] : i18nTimeNames[3],
                T    : H < 12 ? i18nTimeNames[4] : i18nTimeNames[5],
                TT   : H < 12 ? i18nTimeNames[6] : i18nTimeNames[7],
                Z    : getTimezone,
                o    : getTimezoneOffset,
                p    : getTimezoneOffsetColon,
                S    : ['th', 'st', 'nd', 'rd'][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10],
                W    : getWeek,
                N    : getDayOfWeek,
                V    : getWeek,
                VV   : pad(getWeek),
                G    : getWeekYear
            };

            return mask.replace(token, function (match) {
                if (match in flags) {
                    var f = flags[match];
                    if (typeof(f) === 'function') {
                        var val = f(date, utc, gmt);
                        flags[match] = val;
                        return val;
                    } else {
                        return f;
                    }
                } else {
                    return match.slice(1, match.length - 1);
                }
            });
        };
    })();

    dateFormat.masks = {
        'default'             : 'ddd mmm dd yyyy HH:MM:ss',
        'shortDate'           : 'm/d/yy',
        'mediumDate'          : 'mmm d, yyyy',
        'longDate'            : 'mmmm d, yyyy',
        'fullDate'            : 'dddd, mmmm d, yyyy',
        'shortTime'           : 'h:MM TT',
        'mediumTime'          : 'h:MM:ss TT',
        'longTime'            : 'h:MM:ss TT Z',
        'isoDate'             : DEFAULT_ISO_DATE_FORMAT,
        'isoTime'             : 'HH:MM:ss',
        'isoDateTime'         : 'yyyy-mm-dd\'T\'HH:MM:sso',
        'isoUtcDateTime'      : 'UTC:yyyy-mm-dd\'T\'HH:MM:ss\'Z\'',
        'expiresHeaderFormat' : 'ddd, dd mmm yyyy HH:MM:ss Z'
    };

    // Internationalization strings
    dateFormat.i18n = {
        dayNames: DEFAULT_DAY_NAMES,
        monthNames: DEFAULT_MONTH_NAMES,
        timeNames: DEFAULT_TIME_NAMES,
    };

    function pad(val, len) {
        if (typeof(val) === 'function') {
            return function(date, utc, gmt) {
                return pad(val(date, utc, gmt), len);
            };
        }
        val = String(val);
        len = len || 2;
        while (val.length < len) {
            val = '0' + val;
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
        // Create a copy of date object
        var target = new Date(date.valueOf());

        // ISO week date weeks start on monday
        // so correct the day number
        var dayNr = (date.getDay() + 6) % 7;

        // ISO 8601 states that week 1 is the week
        // with the first thursday of that year.
        // Set the target date to the thursday in the target week
        target.setDate(target.getDate() - dayNr + 3);

        // Store the millisecond value of the target date
        var firstThursday = target.valueOf();

        // Set the target to the first thursday of the year
        // First set the target to january first
        target.setMonth(0, 1);
        // Not a thursday? Correct the date to the next thursday
        if (target.getDay() != 4) {
            target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
        }

        // The weeknumber is the number of weeks between the
        // first thursday of the year and the thursday in the target week
        return 1 + Math.ceil((firstThursday - target) / 604800000); // 604800000 = 7 * 24 * 3600 * 1000
    }

    function getWeekYear(date) {
        // Create a new date object for the thursday of date's week
        var target  = new Date(date.valueOf());
        target.setDate(target.getDate() - ((date.getDay() + 6) % 7) + 3);

        return target.getFullYear();
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
        if(dow === 0) {
            dow = 7;
        }
        return dow;
    }

    var timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
    var timezoneClip = /[^-+\dA-Z]/g;
    function getTimezone(date, utc, gmt) {
        return gmt ? 'GMT' : utc ? 'UTC' : (String(date).match(timezone) || ['']).pop().replace(timezoneClip, '');
    }

    function getTimezoneOffset(date, utc) {
        var o = utc ? 0 : date.getTimezoneOffset();
        return (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4);
    }

    function getTimezoneOffsetColon(date, utc) {
        var o = utc ? 0 : date.getTimezoneOffset();
        return (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60),2) + ':' + pad(Math.floor(Math.abs(o) % 60), 2);
    }

    function getISODateString(date) {
        var str = String(date.getFullYear()) + '-',
            m = date.getMonth() + 1,
            d = date.getDate();

        if (m < 10) {
            str += '0';
        }
        str += m + '-';

        if (d < 10) {
            str += '0';
        }
        return str + d;
    }

    if (typeof(define) === 'function' && define.amd) {
        define(function () {
            return dateFormat;
        });
    } else if (typeof(exports) === 'object') {
        module.exports = dateFormat;
    } else {
        global.dateFormat = dateFormat;
    }
})(this);
