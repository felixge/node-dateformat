var assert = require('assert');
var dateFormat = require('../lib/dateformat');

describe('I18N settings', function () {
    it('should be able to override AM/PM strings', function () {
        dateFormat.i18n = {
            timeNames: ['f', 'e', 'fm', 'em', 'F', 'E', 'FM', 'EM']
        };
        assert.strictEqual(dateFormat(new Date(2019,3,11,5), 'h t'), '5 f');
        assert.strictEqual(dateFormat(new Date(2019,3,11,5), 'h tt'), '5 fm');
        assert.strictEqual(dateFormat(new Date(2019,3,11,5), 'h T'), '5 F');
        assert.strictEqual(dateFormat(new Date(2019,3,11,5), 'h TT'), '5 FM');
        assert.strictEqual(dateFormat(new Date(2019,3,11,17), 'h t'), '5 e');
        assert.strictEqual(dateFormat(new Date(2019,3,11,17), 'h tt'), '5 em');
        assert.strictEqual(dateFormat(new Date(2019,3,11,17), 'h T'), '5 E');
        assert.strictEqual(dateFormat(new Date(2019,3,11,17), 'h TT'), '5 EM');
    });

    it('should be able to override month names', function () {
        var monthNames = [
            'Aaa', 'Bbb', 'Ccc', 'Ddd', 'Eee', 'Fff', 'Ggg', 'Hhh', 'Iii', 'Jjj', 'Kkk', 'Lll',
            'Aaaa', 'Bbbb', 'Cccc', 'Dddd', 'Eeee', 'Ffff', 'Gggg', 'Hhhh', 'Iiii', 'Jjjj', 'Kkkk', 'Llll',
        ];
        dateFormat.i18n = { monthNames: monthNames };
        for (var m = 0; m < 12; m++) {
            assert.strictEqual(dateFormat(new Date(2019,m,11), 'mmm'), monthNames[m]);
            assert.strictEqual(dateFormat(new Date(2019,m,11), 'mmmm'), monthNames[m+12]);
        }
    });

    it('should be able to override day names', function () {
        var dayNames = [
            'Aaa', 'Bbb', 'Ccc', 'Ddd', 'Eee', 'Fff', 'Ggg',
            'Aaaa', 'Bbbb', 'Cccc', 'Dddd', 'Eeee', 'Ffff', 'Gggg',
        ];
        dateFormat.i18n = { dayNames: dayNames };
        for (var d = 0; d < 7; d++) {
            var date = new Date(2019,3,7+d)
            assert.strictEqual(dateFormat(date, 'ddd'), dayNames[d]);
            assert.strictEqual(dateFormat(date, 'dddd'), dayNames[d+7]);
        }
    });

    it('should be able possible to reset to defaults', function () {
        dateFormat.i18n = null;
        assert.strictEqual(
            dateFormat(new Date(2019,3,7,5), 'h TT, dddd mmmm d'),
            '5 AM, Sunday April 7'
        );
        assert.strictEqual(
            dateFormat(new Date(2019,0,8,17), 'h TT, dddd mmmm d'),
            '5 PM, Tuesday January 8'
        );
        assert.strictEqual(
            dateFormat(new Date(2019,9,10,17), 'h tt, ddd mmm d'),
            '5 pm, Thu Oct 10'
        );
    });

});
