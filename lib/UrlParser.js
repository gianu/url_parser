"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _ = _interopRequire(require("lodash"));

var Parser = _interopRequire(require("./Parser"));

var UrlPaser = (function () {
  /*
   * @constructs UrlParser
   * @param {String} fmtString - The Format string to be used.
   * @throws Error if format string is empty or a non string object.
   */

  function UrlPaser() {
    var fmtString = arguments[0] === undefined ? "" : arguments[0];

    _classCallCheck(this, UrlPaser);

    if (!_.isString(fmtString)) {
      throw new Error("Format String must be a string.");
    }

    if (_.isEmpty(fmtString)) {
      throw new Error("Format String must be provided.");
    }

    this.fmtString = fmtString;
  }

  _createClass(UrlPaser, {
    extractVariables: {

      /*
       * Method to extract the variables from a url based on the format string of this instance.
       *
       * This method assume the format and the url are valid.
       *
       * In case of variable name collision, the override value define if we should keep the url
       * variable or the query string variable.
       *
       * @param {String} urlInstance - Specific URL (eg: '/6/api/listings/100?sort=desc&limit=10')
       * @param {boolean} override - If true, the variables will be overriden in case of collision.
       *
       * @returns A Hash with the variables extracted from this url.
       */

      value: function extractVariables() {
        var urlInstance = arguments[0] === undefined ? "" : arguments[0];
        var override = arguments[1] === undefined ? false : arguments[1];

        var fmtParts = this.fmtString.split("/");

        var _Parser$splitUrl = Parser.splitUrl(urlInstance);

        var _Parser$splitUrl2 = _slicedToArray(_Parser$splitUrl, 2);

        var url = _Parser$splitUrl2[0];
        var querystring = _Parser$splitUrl2[1];

        var urlMap = Parser.parseUrl(fmtParts, url);
        var qsMap = Parser.parseQueryString(querystring);

        return _.merge(urlMap, qsMap, function (url, qs) {
          if (override) {
            return qs;
          } else {
            return url;
          }
        });
      }
    }
  });

  return UrlPaser;
})();

module.exports = UrlPaser;