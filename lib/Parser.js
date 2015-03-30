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
      /*
       * Method to parse a url based on a format String.
       * The format String contains variables (which starts with :) and based on that
       * information the url is parsed.
       *
       * The fmt format and the url format MUST BE THE SAME.
       *
       * @param {string} fmt - The format String (eg: '/:version/api/:collection/:id').
       * @param {string} urlString - The URL String (eg: '/6/api/listings/3').
       * @returns A Hash with the variables (eg: {'version': 6, 'collection': 'listings', 'id': 3}).
       */

      value: function parseUrl() {
        var fmt = arguments[0] === undefined ? "" : arguments[0];
        var urlString = arguments[1] === undefined ? "" : arguments[1];

        var urlParts = urlString.split("/");
        var fmtParts = fmt.split("/");
        var map = {};

        fmtParts.forEach(function (key, index) {
          if (_.startsWith(key, ":")) {
            var normalizedKey = key.substring(1);
            map[normalizedKey] = normalizeValue(urlParts[index]);
          }
        });

        return map;
      }
    },
    parseQueryString: {

      /*
       * Method to parse the query String and get a map with variables.
       *
       * @params {string} queryString - The Query String (eg: 'sort=desc&limit=10').
       * @returns A Hash with the varaibles (eg: {'sort': 'desc', 'limit'=10}).
       */

      value: function parseQueryString(queryString) {
        var map = {};

        if (queryString) {
          var sections = queryString.split("&");
          sections.forEach(function (section) {
            var _section$split = section.split("=");

            var _section$split2 = _slicedToArray(_section$split, 2);

            var key = _section$split2[0];
            var value = _section$split2[1];

            if (_.endsWith(key, "[]")) {
              var normalizedKey = key.substring(0, key.length - 2);

              if (map[normalizedKey]) {
                map[normalizedKey].push(normalizeValue(value));
              } else {
                map[normalizedKey] = [normalizeValue(value)];
              }
            } else {
              map[key] = normalizeValue(value);
            }
          });
        }

        return map;
      }
    },
    splitUrl: {

      /*
       * Method to split a URL (eg: '/users/6/collections?section=1') in
       * url (eg: '/users/6/collections') and query string (section=1)
       *
       * @param {string} urlString - The full Url String.
       * @returns An array with the url without the query string and the query string.
       */

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