import { strictEqual } from 'node:assert';

import dateFormat from './../lib/dateformat.js';

describe('quoted substrings', function() {
  var az = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  it('should not format single quoted substrings removing quotes', function() {
    var result = dateFormat("'" + az + "'");
    strictEqual(result, az);
  });

  it('should not format double quoted substrings removing quotes', function() {
    var result = dateFormat('"' + az + '"');
    strictEqual(result, az);
  });
});
