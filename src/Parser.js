import _ from "lodash";

export default class Parser {
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
  static parseUrl(fmt="", urlString="") {
    let urlParts = urlString.split("/");
    let fmtParts = fmt.split("/");
    let map = {};

    fmtParts.forEach((key, index) => {
      if (_.startsWith(key, ":")) {
        let normalizedKey = key.substring(1);
        map[normalizedKey] = normalizeValue(urlParts[index]);
      }
    });

    return map;
  }

  /*
   * Method to parse the query String and get a map with variables.
   *
   * @params {string} queryString - The Query String (eg: 'sort=desc&limit=10').
   * @returns A Hash with the varaibles (eg: {'sort': 'desc', 'limit'=10}).
   */
  static parseQueryString(queryString) {
    let map = {};

    if (queryString) {
      let sections = queryString.split("&");
      sections.forEach((section) => {
        let [key, value] = section.split("=");

        if(_.endsWith(key, "[]")) {
          let normalizedKey = key.substring(0, key.length - 2);

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

  /*
   * Method to split a URL (eg: '/users/6/collections?section=1') in
   * url (eg: '/users/6/collections') and query string (section=1)
   *
   * @param {string} urlString - The full Url String.
   * @returns An array with the url without the query string and the query string.
   */
  static splitUrl(urlString="") {
    return urlString.split("?");
  }
}

function normalizeValue(value) {
  let normalizedValue = parseInt(value);

  if (!_.isNaN(normalizedValue)) {
    return normalizedValue;
  } else {
    return value;
  }
}
