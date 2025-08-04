import { describe, it, beforeEach } from "node:test";
import { strictEqual,notStrictEqual } from 'node:assert';

import dateFormat from './../lib/dateformat.js';

const dayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const dayNamesLong = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const threeDays = ['Yesterday', 'Today', 'Tomorrow', 'Ysd', 'Tdy', 'Tmw'];

describe('threeDays', function () {
	let date, DDD, DDDD;
	beforeEach(function () {
		date = new Date();
	});
	it('should return "Yesterday" (Today - 1 day)', () => {
		date.setDate(date.getDate() - 1);
		DDDD = dateFormat(date, 'DDDD');
		strictEqual(DDDD, "Yesterday");
	});
	it('should return "Ysd" (Today - 1 day)', () => {
		date.setDate(date.getDate() - 1);
		DDD = dateFormat(date, 'DDD');
		strictEqual(DDD, "Ysd");
	});
	it('should return "Today" (Today)', () => {
		DDDD = dateFormat(date, 'DDDD');
		strictEqual(DDDD, "Today");
	});
	it('should return "Tdy" (Today)', () => {
		DDD = dateFormat(date, 'DDD');
		strictEqual(DDD, "Tdy");
	});
	it('should return "Tomorrow" (Today + 1 day)', () => {
		date.setDate(date.getDate() + 1);
		DDDD = dateFormat(date, 'DDDD');
		strictEqual(DDDD, "Tomorrow");
	});
	it('should return "Tmw" (Today + 1 day)', () => {
		date.setDate(date.getDate() + 1);
		DDD = dateFormat(date, 'DDD');
		strictEqual(DDD, "Tmw");
	});
	it('should not return "Yesterday", "Today", "Tomorrow", "Ysd", "Tdy", or "Tmw" (Today - 2 days)', () => {
		date.setDate(date.getDate() - 2);
		DDD = dateFormat(date, 'DDD');
		DDDD = dateFormat(date, 'DDDD');
		strictEqual(threeDays.indexOf(DDD), -1);
		strictEqual(threeDays.indexOf(DDDD), -1);
	});
	it('should not return "Yesterday", "Today" or "Tomorrow", "Ysd", "Tdy", or "Tmw" (Today + 2 days)', () => {
		date.setDate(date.getDate() + 2);
		DDD = dateFormat(date, 'DDD');
		DDDD = dateFormat(date, 'DDDD');
		strictEqual(threeDays.indexOf(DDD), -1);
		strictEqual(threeDays.indexOf(DDDD), -1);
	});
	it('should return short day name (Today - 2 days)', () => {
		date.setDate(date.getDate() - 2);
		DDD = dateFormat(date, 'DDD');
		notStrictEqual(dayNamesShort.indexOf(DDD), -1);
	});
	it('should return short day name (Today + 2 days)', () => {
		date.setDate(date.getDate() + 2);
		DDD = dateFormat(date, 'DDD');
		notStrictEqual(dayNamesShort.indexOf(DDD), -1);
	});
	it('should return long day name (Today - 2 days)', () => {
		date.setDate(date.getDate() - 2);
		DDDD = dateFormat(date, 'DDDD');
		notStrictEqual(dayNamesLong.indexOf(DDDD), -1);
	});
	it('should return short day name (Today + 2 days)', () => {
		date.setDate(date.getDate() + 2);
		DDDD = dateFormat(date, 'DDDD');
		notStrictEqual(dayNamesLong.indexOf(DDDD), -1);
	});
});
