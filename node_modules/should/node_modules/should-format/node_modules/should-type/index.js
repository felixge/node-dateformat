var toString = Object.prototype.toString;

var isPromiseExist = typeof Promise !== 'undefined';
var isBufferExist = typeof Buffer !== 'undefined';

var NUMBER = 'number';//
var UNDEFINED = 'undefined';//
var STRING = 'string';//
var BOOLEAN = 'boolean';//
var OBJECT = 'object';
var FUNCTION = 'function';//
var NULL = 'null';//
var ARRAY = 'array';
var REGEXP = 'regexp';//
var DATE = 'date';//
var ERROR = 'error';//
var ARGUMENTS = 'arguments';//
var SYMBOL = 'symbol';
var ARRAY_BUFFER = 'array-buffer';//
var TYPED_ARRAY = 'typed-array';//
var DATA_VIEW = 'data-view';
var MAP = 'map';
var SET = 'set';
var WEAK_SET = 'weak-set';
var WEAK_MAP = 'weak-map';
var PROMISE = 'promise';//

var WRAPPER_NUMBER = 'object-number';//
var WRAPPER_BOOLEAN = 'object-boolean';//
var WRAPPER_STRING = 'object-string';//

// node buffer
var BUFFER = 'buffer';//

// dom html element
var HTML_ELEMENT = 'html-element';//
var HTML_ELEMENT_TEXT = 'html-element-text';//
var DOCUMENT = 'document';//
var WINDOW = 'window';//
var FILE = 'file';
var FILE_LIST = 'file-list';
var BLOB = 'blob';

var XHR = 'xhr';//

module.exports = function getType(instance) {
  var type = typeof instance;

  switch (type) {
    case NUMBER:
      return NUMBER;
    case UNDEFINED:
      return UNDEFINED;
    case STRING:
      return STRING;
    case BOOLEAN:
      return BOOLEAN;
    case FUNCTION:
      return FUNCTION;
    case SYMBOL:
      return SYMBOL;
    case OBJECT:
      if (instance === null) return NULL;

      var clazz = toString.call(instance);

      switch (clazz) {
        case '[object String]':
          return WRAPPER_STRING;
        case '[object Boolean]':
          return WRAPPER_BOOLEAN;
        case '[object Number]':
          return WRAPPER_NUMBER;
        case '[object Array]':
          return ARRAY;
        case '[object RegExp]':
          return REGEXP;
        case '[object Error]':
          return ERROR;
        case '[object Date]':
          return DATE;
        case '[object Arguments]':
          return ARGUMENTS;
        case '[object Math]':
          return OBJECT;
        case '[object JSON]':
          return OBJECT;
        case '[object ArrayBuffer]':
          return ARRAY_BUFFER;
        case '[object Int8Array]':
          return TYPED_ARRAY;
        case '[object Uint8Array]':
          return TYPED_ARRAY;
        case '[object Uint8ClampedArray]':
          return TYPED_ARRAY;
        case '[object Int16Array]':
          return TYPED_ARRAY;
        case '[object Uint16Array]':
          return TYPED_ARRAY;
        case '[object Int32Array]':
          return TYPED_ARRAY;
        case '[object Uint32Array]':
          return TYPED_ARRAY;
        case '[object Float32Array]':
          return TYPED_ARRAY;
        case '[object Float64Array]':
          return TYPED_ARRAY;
        case '[object DataView]':
          return DATA_VIEW;
        case '[object Map]':
          return MAP;
        case '[object WeakMap]':
          return WEAK_MAP;
        case '[object Set]':
          return SET;
        case '[object WeakSet]':
          return WEAK_SET;
        case '[object Promise]':
          return PROMISE;
        case '[object Window]':
          return WINDOW;
        case '[object HTMLDocument]':
          return DOCUMENT;
        case '[object Blob]':
          return BLOB;
        case '[object File]':
          return FILE;
        case '[object FileList]':
          return FILE_LIST;
        case '[object XMLHttpRequest]':
          return XHR;
        case '[object Text]':
          return HTML_ELEMENT_TEXT;
        default:
          if (isPromiseExist && instance instanceof Promise) return PROMISE;

          if (isBufferExist && instance instanceof Buffer) return BUFFER;

          if (/^\[object HTML\w+Element\]$/.test(clazz)) return HTML_ELEMENT;

          if (clazz === '[object Object]') return OBJECT;
      }
  }
};
