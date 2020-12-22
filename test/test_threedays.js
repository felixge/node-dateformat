const assert = require('assert');

const dateFormat = require('./../lib/dateformat');

const dayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const dayNamesLong = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const threeDays = ['Yesterday', 'Today', 'Tomorrow', 'Ysd', 'Tdy', 'Tmw'];

describe('threeDays', function () {
	let date, DDD, DDDD;
	beforeEach(function () {
		date = new Date();
	});
	it('should return "Yesterday" (Today - 1 day)', function (done) {
		date.setDate(date.getDate() - 1);
		DDDD = dateFormat(date, 'DDDD');
		assert.strictEqual(DDDD, "Yesterday");
		done();
	});
	it('should return "Ysd" (Today - 1 day)', function (done) {
		date.setDate(date.getDate() - 1);
		DDD = dateFormat(date, 'DDD');
		assert.strictEqual(DDD, "Ysd");
		done();
	});
	it('should return "Today" (Today)', function (done) {
		DDDD = dateFormat(date, 'DDDD');
		assert.strictEqual(DDDD, "Today");
		done();
	});
	it('should return "Tdy" (Today)', function (done) {
		DDD = dateFormat(date, 'DDD');
		assert.strictEqual(DDD, "Tdy");
		done();
	});
	it('should return "Tomorrow" (Today + 1 day)', function (done) {
		date.setDate(date.getDate() + 1);
		DDDD = dateFormat(date, 'DDDD');
		assert.strictEqual(DDDD, "Tomorrow");
		done();
	});
	it('should return "Tmw" (Today + 1 day)', function (done) {
		date.setDate(date.getDate() + 1);
		DDD = dateFormat(date, 'DDD');
		assert.strictEqual(DDD, "Tmw");
		done();
	});
	it('should not return "Yesterday", "Today", "Tomorrow", "Ysd", "Tdy", or "Tmw" (Today - 2 days)', function (done) {
		date.setDate(date.getDate() - 2);
		DDD = dateFormat(date, 'DDD');
		DDDD = dateFormat(date, 'DDDD');
		assert.strictEqual(threeDays.indexOf(DDD), -1);
		assert.strictEqual(threeDays.indexOf(DDDD), -1);
		done();
	});
	it('should not return "Yesterday", "Today" or "Tomorrow", "Ysd", "Tdy", or "Tmw" (Today + 2 days)', function (done) {
		date.setDate(date.getDate() + 2);
		DDD = dateFormat(date, 'DDD');
		DDDD = dateFormat(date, 'DDDD');
		assert.strictEqual(threeDays.indexOf(DDD), -1);
		assert.strictEqual(threeDays.indexOf(DDDD), -1);
		done();
	});
	it('should return short day name (Today - 2 days)', function (done) {
		date.setDate(date.getDate() - 2);
		DDD = dateFormat(date, 'DDD');
		assert.notStrictEqual(dayNamesShort.indexOf(DDD), -1);
		done();
	});
	it('should return short day name (Today + 2 days)', function (done) {
		date.setDate(date.getDate() + 2);
		DDD = dateFormat(date, 'DDD');
		assert.notStrictEqual(dayNamesShort.indexOf(DDD), -1);
		done();
	});
	it('should return long day name (Today - 2 days)', function (done) {
		date.setDate(date.getDate() - 2);
		DDDD = dateFormat(date, 'DDDD');
		assert.notStrictEqual(dayNamesLong.indexOf(DDDD), -1);
		done();
	});
	it('should return short day name (Today + 2 days)', function (done) {
		date.setDate(date.getDate() + 2);
		DDDD = dateFormat(date, 'DDDD');
		assert.notStrictEqual(dayNamesLong.indexOf(DDDD), -1);
		done();
	});
});
