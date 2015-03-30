import _ from "lodash";
import Parser from "./Parser";

function checkUrl(url, model="Url") {
  if(!_.isString(url)) {
    throw new Error(`${model} must be a string.`);
  }

  if(_.isEmpty(url)) {
    throw new Error(`${model} must be provided.`);
  }

  if(!_.startsWith(url, "/")) {
    throw new Error(`${model} must start with /`);
  }
}

export default class UrlPaser {
  /*
   * @constructs UrlParser
   * @param {String} fmtString - The Format string to be used.
   * @throws Error if format string is empty or a non string object.
   */
  constructor(fmtString="") {
    checkUrl(fmtString, "Format String");

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
    checkUrl(urlInstance, "Url");

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

