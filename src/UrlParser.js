import _ from "lodash";
import Parser from "./Parser";

export default class UrlPaser {
  /*
   * @constructs UrlParser
   * @param {String} fmtString - The Format string to be used.
   */
  constructor(fmtString="") {
    if(!_.isString(fmtString)) {
      throw new Error('Format String must be a string.');
    }

    if(_.isEmpty(fmtString)) {
      throw new Error('Format String must be provided.');
    }

    this.fmtString = fmtString;
  }

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
  extractVariables(urlInstance="", override=false) {
    let fmtParts = this.fmtString.split("/");

    let [url, querystring] = Parser.splitUrl(urlInstance);

    let urlMap = Parser.parseUrl(fmtParts, url);
    let qsMap = Parser.parseQueryString(querystring);

    return _.merge(urlMap, qsMap, (url, qs) => {
      if (override) {
        return qs;
      } else {
        return url;
      }
    });
  }
}

