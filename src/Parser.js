import _ from 'lodash';

export default class Parser {
  static parseUrl(fmt="", urlString="") {

    let urlParts = urlString.split('/');
    let map = {};
    fmt.forEach((key, index) => {
      if (_.startsWith(key, ':')) {
        let normalizedKey = key.substring(1);
        map[normalizedKey] = normalizeValue(urlParts[index]);
      }
    });

    return map;
  }

  static parseQueryString(queryString) {
    let map = {};
    if (queryString) {
      let variables = queryString.split('&');
      variables.forEach((key) => {
        let [k, v] = key.split('=');

        if(_.endsWith(k, '[]')) {
          let normalizedKey = k.substring(0, k.length - 2);
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

  static splitUrl(urlString="") {
    return urlString.split('?');
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
