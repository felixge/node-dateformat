# dateformat-light

A node.js package for Steven Levithan's excellent [dateFormat()][dateformat] function.

## Modifications

### 1.3.2
* Fix issue when applying function in Safari to strings missing timezone designator.

### 1.3.1
* Fix issue with formatting the number 0. See https://github.com/felixge/node-dateformat/issues/79

### 1.3.0
* Add placeholder 'p' to format timezone with colon

### 1.2.1
* Fix problem with format 'L' and milliseconds over 995. See https://github.com/felixge/node-dateformat/issues/89

### 1.2.0
* Add ability to localize AM/PM strings

### 1.1.0
* Add placeholder 'VV' for zero-padded variant of ISO 8601 week number

### 1.0.14
* Lazy evaluation of more expensive placeholders to improve performance in
  most cases where these placeholders are not used.
* Allow both "" and '' for literals

### 1.0.13
* Add placeholder 'G' for week year according to ISO 8601.
* Add placeholder 'V' for week number according to ISO 8601
* Removed CLI and fixed AMD include definition

### 1.0.11
* Removed the `Date.prototype.format` method. Sorry folks, but extending native prototypes is for suckers.
* Added a `module.exports = dateFormat;` statement at the bottom
* Added the placeholder `N` to get the ISO 8601 numeric representation of the day of the week

## Installation

```bash
$ npm install dateformat-light
```

## Usage

As taken from Steven's post, modified to match the Modifications listed above:
```js
var dateFormat = require('dateformat');
var now = new Date();

// Basic usage
dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
// Saturday, June 9th, 2007, 5:46:21 PM

// You can use one of several named masks
dateFormat(now, "isoDateTime");
// 2007-06-09T17:46:21

// ...Or add your own
dateFormat.masks.hammerTime = 'HH:MM! "Can\'t touch this!"';
dateFormat(now, "hammerTime");
// 17:46! Can't touch this!

// You can also provide the date as a string
dateFormat("Jun 9 2007", "fullDate");
// Saturday, June 9, 2007

// Note that if you don't include the mask argument,
// dateFormat.masks.default is used
dateFormat(now);
// Sat Jun 09 2007 17:46:21

// And if you don't include the date argument,
// the current date and time is used
dateFormat();
// Sat Jun 09 2007 17:46:22

// You can also skip the date argument (as long as your mask doesn't
// contain any numbers), in which case the current date/time is used
dateFormat("longTime");
// 5:46:22 PM EST

// And finally, you can convert local time to UTC time. Simply pass in
// true as an additional argument (no argument skipping allowed in this case):
dateFormat(now, "longTime", true);
// 10:46:21 PM UTC

// ...Or add the prefix "UTC:" or "GMT:" to your mask.
dateFormat(now, "UTC:h:MM:ss TT Z");
// 10:46:21 PM UTC

// You can also get the ISO 8601 week of the year:
dateFormat(now, "W");
// 42

// You can also get the ISO 8601 week year:
dateFormat(now, "G");
// 2007

// and also get the ISO 8601 numeric representation of the day of the week:
dateFormat(now,"N");
// 6
```

### Mask options

Mask | Description
---- | -----------
`d` | Day of the month as digits; no leading zero for single-digit days.
`dd` | Day of the month as digits; leading zero for single-digit days.
`ddd` | Day of the week as a three-letter abbreviation.
`dddd` | Day of the week as its full name.
`m` | Month as digits; no leading zero for single-digit months.
`mm` | Month as digits; leading zero for single-digit months.
`mmm` | Month as a three-letter abbreviation.
`mmmm` | Month as its full name.
`yy` | Year as last two digits; leading zero for years less than 10.
`yyyy` | Year represented by four digits.
`h` | Hours; no leading zero for single-digit hours (12-hour clock).
`hh` | Hours; leading zero for single-digit hours (12-hour clock).
`H` | Hours; no leading zero for single-digit hours (24-hour clock).
`HH` | Hours; leading zero for single-digit hours (24-hour clock).
`M` | Minutes; no leading zero for single-digit minutes.
`MM` | Minutes; leading zero for single-digit minutes.
`N` | ISO 8601 numeric representation of the day of the week.
`o` | GMT/UTC timezone offset, e.g. -0500 or +0230.
`p` | GMT/UTC timezone offset, e.g. -05:00 or +02:30.
`s` | Seconds; no leading zero for single-digit seconds.
`ss` | Seconds; leading zero for single-digit seconds.
`S` | The date's ordinal suffix (st, nd, rd, or th). Works well with `d`.
`l` |  Milliseconds; gives 3 digits.
`L` | Milliseconds; gives 2 digits.
`t`	| Lowercase, single-character time marker string: a or p.
`tt` | Lowercase, two-character time marker string: am or pm.
`T` | Uppercase, single-character time marker string: A or P.
`TT` | Uppercase, two-character time marker string: AM or PM.
`W` | ISO 8601 week number of the year, e.g. 42
`V` | ISO 8601 week number of the year, e.g. 42
`VV` | ISO 8601 week number of the year with leading zero for single-digit weeks, e.g. 09
`G` | ISO 8601 week year. Previous year for last days of last week and next year for first days of first week.
`Z` | US timezone abbreviation, e.g. EST or MDT. With non-US timezones or in the
`'...'`, `"..."` | Literal character sequence. Surrounding quotes are removed.
`UTC:` |	Must be the first four characters of the mask. Converts the date from local time to UTC/GMT/Zulu time before applying the mask. The "UTC:" prefix is removed.

### Named Formats

Name | Mask | Example
---- | ---- | -------
`default` | `ddd mmm dd yyyy HH:MM:ss` | Sat Jun 09 2007 17:46:21
`shortDate` | `m/d/yy` | 6/9/07
`mediumDate` | `mmm d, yyyy` | Jun 9, 2007
`longDate` | `mmmm d, yyyy` | June 9, 2007
`fullDate` | `dddd, mmmm d, yyyy` | Saturday, June 9, 2007
`shortTime` | `h:MM TT` | 5:46 PM
`mediumTime` | `h:MM:ss TT` | 5:46:21 PM
`longTime` | `h:MM:ss TT Z` | 5:46:21 PM EST
`isoDate` | `yyyy-mm-dd` | 2007-06-09
`isoTime` | `HH:MM:ss` | 17:46:21
`isoDateTime` | `yyyy-mm-dd'T'HH:MM:sso` | 2007-06-09T17:46:21+0700
`isoUtcDateTime` | `UTC:yyyy-mm-dd'T'HH:MM:ss'Z'` | 2007-06-09T22:46:21Z

### Localization
Day names, month names and the AM/PM indicators can be localized by
passing an object with the necessary strings. For example:
```js
var dateFormat = require('dateformat');
dateFormat.i18n = {
    dayNames: [
        'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ],
    monthNames: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ],
    timeNames: [
        'a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'
    ]
};
```

It is possible to just override one of the arrays, and if you like to reset to the default just set i18n to null or empty object
```js
var dateFormat = require('dateformat');
dateFormat.i18n = null;
```

## License

(c) 2007-2009 Steven Levithan [stevenlevithan.com][stevenlevithan], MIT license.

[dateformat]: http://blog.stevenlevithan.com/archives/date-time-format
[stevenlevithan]: http://stevenlevithan.com/
