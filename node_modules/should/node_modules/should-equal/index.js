var getType = require('should-type');
var hasOwnProperty = Object.prototype.hasOwnProperty;

function makeResult(r, path, reason, a, b) {
  var o = {result: r};
  if(!r) {
    o.path = path;
    o.reason = reason;
    o.a = a;
    o.b = b;
  }
  return o;
}

var EQUALS = makeResult(true);

function format(msg) {
  var args = arguments;
  for(var i = 1, l = args.length; i < l; i++) {
    msg = msg.replace(/%s/, args[i]);
  }
  return msg;
}

var REASON = {
  PLUS_0_AND_MINUS_0: '+0 is not equal to -0',
  DIFFERENT_TYPES: 'A has type %s and B has type %s',
  NAN_NUMBER: 'NaN is not equal to any number',
  EQUALITY: 'A is not equal to B',
  WRAPPED_VALUE: 'A wrapped value is not equal to B wrapped value',
  FUNCTION_SOURCES: 'function A is not equal to B by source code value (via .toString call)',
  MISSING_KEY: '%s does not have key %s',
  CIRCULAR_VALUES: 'A has circular reference that was visited not in the same time as B'
};

var LENGTH = ['length'];
var NAME = ['name'];
var MESSAGE = ['message'];
var BYTE_LENGTH = ['byteLength'];
var PROTOTYPE = ['prototype'];

function eq(a, b, stackA, stackB, path) {
  path = path || [];
  // equal a and b exit early
  if(a === b) {
    // check for +0 !== -0;
    return makeResult(a !== 0 || (1 / a == 1 / b), path, REASON.PLUS_0_AND_MINUS_0, a, b);
  }

  var l;

  var typeA = getType(a),
    typeB = getType(b);

  // if objects has different types they are not equals
  if(typeA !== typeB) return makeResult(false, path, format(REASON.DIFFERENT_TYPES, typeA, typeB), a, b);

  switch(typeA) {
    case 'number':
      return (a !== a) ? makeResult(b !== b, path, REASON.NAN_NUMBER, a, b)
        // but treat `+0` vs. `-0` as not equal
        : (a === 0 ? makeResult((1 / a === 1 / b), path, REASON.PLUS_0_AND_MINUS_0, a, b) : makeResult(a === b, path, REASON.EQUALITY, a, b));

    case 'regexp':
      return makeResult(String(a) === String(b), path, REASON.EQUALITY, a, b);

    case 'boolean':
    case 'string':
      return makeResult(a === b, path, REASON.EQUALITY, a, b);

    case 'date':
      return makeResult(+a === +b, path, REASON.EQUALITY, a, b);

    case 'object-number':
    case 'object-boolean':
    case 'object-string':
      var isValueEqual = a.valueOf() === b.valueOf();
      if(isValueEqual) break;
      return makeResult(false, path, REASON.WRAPPED_VALUE, a.valueOf(), b.valueOf());

    case 'buffer':
      if(a.length !== b.length) return makeResult(false, path.concat(LENGTH), REASON.EQUALITY, a.length, b.length);

      l = a.length;
      while(l--) if(a[l] !== b[l]) return makeResult(false, path.concat([l]), REASON.EQUALITY, a[l], b[l]);

      return EQUALS;

    case 'error':
      //only check not enumerable properties, and check arrays later
      if(a.name !== b.name) return makeResult(false, path.concat(NAME), REASON.EQUALITY, a.name, b.name);
      if(a.message !== b.message) return makeResult(false, path.concat(MESSAGE), REASON.EQUALITY, a.message, b.message);

      break;

    //XXX check more in browsers
    case 'array-buffer':
      if(a.byteLength !== b.byteLength) return makeResult(false, path.concat(BYTE_LENGTH), REASON.EQUALITY, a.byteLength, b.byteLength);

      l = a.byteLength;
      while(l--) if(a[l] !== b[l]) return makeResult(false, path.concat([l]), REASON.EQUALITY, a[l], b[l]);

      return EQUALS;

  }

  // compare deep objects and arrays
  // stacks contain references only
  stackA || (stackA = []);
  stackB || (stackB = []);

  l = stackA.length;
  while(l--) {
    if(stackA[l] == a) {
      return makeResult(stackB[l] == b, path, REASON.CIRCULAR_VALUES, a, b);
    }
  }

  // add `a` and `b` to the stack of traversed objects
  stackA.push(a);
  stackB.push(b);

  var hasProperty,
    keysComparison,
    key;

  if(typeA === 'array' || typeA === 'arguments') {
    if(a.length !== b.length) return makeResult(false, path.concat(LENGTH), REASON.EQUALITY, a.length, b.length);
  }

  if(typeB === 'function') {
    var fA = a.toString(), fB = b.toString();
    if(fA !== fB) return makeResult(false, path, REASON.FUNCTION_SOURCES, fA, fB);
  }

  for(key in b) {
    if(hasOwnProperty.call(b, key)) {
      hasProperty = hasOwnProperty.call(a, key);
      if(!hasProperty) return makeResult(false, path, format(REASON.MISSING_KEY, 'A', key), a, b);

      keysComparison = eq(a[key], b[key], stackA, stackB, path.concat([key]));
      if(!keysComparison.result) return keysComparison;
    }
  }

  // ensure both objects have the same number of properties
  for(key in a) {
    if(hasOwnProperty.call(a, key)) {
      hasProperty = hasOwnProperty.call(b, key);
      if(!hasProperty) return makeResult(false, path, format(REASON.MISSING_KEY, 'B', key), a, b);
    }
  }

  stackA.pop();
  stackB.pop();

  if(typeB === 'function') {
    keysComparison = eq(a.prototype, b.prototype, stackA, stackB, path.concat(PROTOTYPE));
    if(!keysComparison.result) return keysComparison;
  }

  return EQUALS;
}


module.exports = eq;
