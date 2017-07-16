var assert = require('assert');

var dateFormat = require('./../lib/dateformat');

var dayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var dayNamesLong = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var threeDays = ['Yesterday', 'Today', 'Tomorrow'];

describe('threeDays', function() {
  var date, DDD, DDDD;
  beforeEach(function() {
	date = new Date();
  });
  it('should return "Yesterday" (Today - 1 day)', function(done) {
  	date.setDate(date.getDate() - 1);
  	DDD = dateFormat(date, 'DDD');
  	DDDD = dateFormat(date, 'DDDD');
  	assert.strictEqual(DDD, "Yesterday");
  	assert.strictEqual(DDDD, "Yesterday");
  	done();
  });
  it('should return "Today" (Today)', function(done) {
  	DDD = dateFormat(date, 'DDD');
  	DDDD = dateFormat(date, 'DDDD');
  	assert.strictEqual(DDD, "Today");
  	assert.strictEqual(DDDD, "Today");
  	done();
  });
  it('should return "Tomorrow" (Today + 1 day)', function(done) {
  	date.setDate(date.getDate() + 1);
  	DDD = dateFormat(date, 'DDD');
  	DDDD = dateFormat(date, 'DDDD');
  	assert.strictEqual(DDD, "Tomorrow");
  	assert.strictEqual(DDDD, "Tomorrow");
  	done();
  });
  it('should not return "Yesterday", "Today" or "Tomorrow" (Today - 2 days)', function(done) {
  	date.setDate(date.getDate() - 2);
  	DDD = dateFormat(date, 'DDD');
  	DDDD = dateFormat(date, 'DDDD');
  	assert.strictEqual(threeDays.indexOf(DDD), -1);
  	assert.strictEqual(threeDays.indexOf(DDDD), -1);
  	done();
  });
  it('should not return "Yesterday", "Today" or "Tomorrow" (Today + 2 days)', function(done) {
  	date.setDate(date.getDate() + 2);
  	DDD = dateFormat(date, 'DDD');
  	DDDD = dateFormat(date, 'DDDD');
  	assert.strictEqual(threeDays.indexOf(DDD), -1);
  	assert.strictEqual(threeDays.indexOf(DDDD), -1);
  	done();
  });
  it('should return short day name (Today - 2 days)', function(done) {
  	date.setDate(date.getDate() - 2);
  	DDD = dateFormat(date, 'DDD');
  	assert.notStrictEqual(dayNamesShort.indexOf(DDD), -1);
  	done();
  });
  it('should return short day name (Today + 2 days)', function(done) {
  	date.setDate(date.getDate() + 2);
  	DDD = dateFormat(date, 'DDD');
  	assert.notStrictEqual(dayNamesShort.indexOf(DDD), -1);
  	done();
  });
  it('should return long day name (Today - 2 days)', function(done) {
  	date.setDate(date.getDate() - 2);
  	DDDD = dateFormat(date, 'DDDD');
  	assert.notStrictEqual(dayNamesLong.indexOf(DDDD), -1);
  	done();
  });
  it('should return short day name (Today + 2 days)', function(done) {
  	date.setDate(date.getDate() + 2);
  	DDDD = dateFormat(date, 'DDDD');
  	assert.notStrictEqual(dayNamesLong.indexOf(DDDD), -1);
  	done();
  });
});
