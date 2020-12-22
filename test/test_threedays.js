const assert = require('assert');

const dateFormat = require('./../lib/dateformat');

const dayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const dayNamesLong = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const threeDays = ['Yesterday', 'Today', 'Tomorrow', 'Yes', 'Tod', 'Tom'];

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
	it('should return "Yes" (Today - 1 day)', function (done) {
		date.setDate(date.getDate() - 1);
		DDD = dateFormat(date, 'DDD');
		assert.strictEqual(DDD, "Yes");
		done();
	});
	it('should return "Today" (Today)', function (done) {
		DDDD = dateFormat(date, 'DDDD');
		assert.strictEqual(DDDD, "Today");
		done();
	});
	it('should return "Tod" (Today)', function (done) {
		DDD = dateFormat(date, 'DDD');
		assert.strictEqual(DDD, "Tod");
		done();
	});
	it('should return "Tomorrow" (Today + 1 day)', function (done) {
		date.setDate(date.getDate() + 1);
		DDDD = dateFormat(date, 'DDDD');
		assert.strictEqual(DDDD, "Tomorrow");
		done();
	});
	it('should return "Tom" (Today + 1 day)', function (done) {
		date.setDate(date.getDate() + 1);
		DDD = dateFormat(date, 'DDD');
		assert.strictEqual(DDD, "Tom");
		done();
	});
	it('should not return "Yesterday", "Today", "Tomorrow", "Yes", "Tod", or "Tom" (Today - 2 days)', function (done) {
		date.setDate(date.getDate() - 2);
		DDD = dateFormat(date, 'DDD');
		DDDD = dateFormat(date, 'DDDD');
		assert.strictEqual(threeDays.indexOf(DDD), -1);
		assert.strictEqual(threeDays.indexOf(DDDD), -1);
		done();
	});
	it('should not return "Yesterday", "Today" or "Tomorrow", "Yes", "Tod", or "Tom" (Today + 2 days)', function (done) {
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
