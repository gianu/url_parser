"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _ = _interopRequire(require("lodash"));

var Parser = (function () {
  function Parser() {
    _classCallCheck(this, Parser);
  }

  _createClass(Parser, null, {
    parseUrl: {
      value: function parseUrl() {
        var fmt = arguments[0] === undefined ? "" : arguments[0];
        var urlString = arguments[1] === undefined ? "" : arguments[1];

        var urlParts = urlString.split("/");
        var map = {};
        fmt.forEach(function (key, index) {
          if (_.startsWith(key, ":")) {
            var normalizedKey = key.substring(1);
            map[normalizedKey] = normalizeValue(urlParts[index]);
          }
        });

        return map;
      }
    },
    parseQueryString: {
      value: function parseQueryString(queryString) {
        var map = {};
        if (queryString) {
          var variables = queryString.split("&");
          variables.forEach(function (key) {
            var _key$split = key.split("=");

            var _key$split2 = _slicedToArray(_key$split, 2);

            var k = _key$split2[0];
            var v = _key$split2[1];

            if (_.endsWith(k, "[]")) {
              var normalizedKey = k.substring(0, k.length - 2);
              if (map[normalizedKey]) {
                map[normalizedKey].push(normalizeValue(v));
              } else {
                map[normalizedKey] = [normalizeValue(v)];
              }
            } else {
              map[k] = normalizeValue(v);
            }
          });
        }
        return map;
      }
    },
    splitUrl: {
      value: function splitUrl() {
        var urlString = arguments[0] === undefined ? "" : arguments[0];

        return urlString.split("?");
      }
    }
  });

  return Parser;
})();

module.exports = Parser;

function normalizeValue(value) {
  var normalizedValue = parseInt(value);

  if (!_.isNaN(normalizedValue)) {
    return normalizedValue;
  } else {
    return value;
  }
}