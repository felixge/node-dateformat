var assert = require('assert');
var dateFormat = require('../lib/dateformat');

describe('Week and week year formats', function () {
    it('should format "V" as single-digit iso week', function () {
        assert.strictEqual('9', dateFormat(new Date(2019,2,1), 'V'));
        assert.strictEqual('10', dateFormat(new Date(2019,2,5), 'V'));
        assert.strictEqual('34', dateFormat(new Date(2019,7,21), 'V'));
    });
    it('should format "VV" as double-digit iso week', function () {
        assert.strictEqual('09', dateFormat(new Date(2019,2,1), 'VV'));
        assert.strictEqual('10', dateFormat(new Date(2019,2,5), 'VV'));
        assert.strictEqual('34', dateFormat(new Date(2019,7,21), 'VV'));
    });
    it('should recognize first days in first week as next week year', function () {
        assert.strictEqual('2019', dateFormat(new Date(2018,11,31), 'G'));
    });
    it('should recognize last days in last week as previous week year', function () {
        assert.strictEqual('2016', dateFormat(new Date(2017,0,1), 'G'));
    });
});
