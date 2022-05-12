const strictEqual = require('assert').strictEqual;

const dateFormat = require('./../lib/dateformat.cjs');

describe('dayOfWeek', function() {
  it('should correctly format the timezone part', function(done) {
    var start = 10; // the 10 of March 2013 is a Sunday
    for(var dow = 1; dow <= 7; dow++){
      var date = new Date('2013-03-' + (start + dow));
      var N = dateFormat(date, 'N');
      strictEqual(N, String(dow));
    }
    done();
  });
});
