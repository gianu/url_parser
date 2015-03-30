import _ from 'lodash';
import Parser from './Parser';

export default class UrlPaser {
  constructor(fmtString="") {
    this.fmtString = fmtString;
  }

  extractVariables(urlInstance="") {
    let fmtParts = this.fmtString.split('/');

    let [url, querystring] = Parser.splitUrl(urlInstance);

    let urlMap = Parser.parseUrl(fmtParts, url);
    let qsMap = Parser.parseQueryString(querystring);

    return _.merge(urlMap, qsMap);
  }
}

