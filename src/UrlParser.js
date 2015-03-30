import _ from 'lodash';

export default class UrlPaser {
  constructor(fmtString="") {
    this.fmtString = fmtString;
  }

  extractVariables(urlInstance="") {
    let fmtParts = this.fmtString.split('/');

    let instanceSplit = urlInstance.split('?');
    let urlSection = instanceSplit[0];
    let variablePart = instanceSplit[1];

    let urlParts = urlSection.split('/');
    let map = {};
    fmtParts.forEach((key, index) => {
      if (_.startsWith(key, ':')) {
        let normalizedKey = key.substring(1);
        map[normalizedKey] = normalizeValue(urlParts[index]);
      }
    });

    if (variablePart) {
      let variables = variablePart.split('&');
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
}

function normalizeValue(value) {
  let normalizedValue = parseInt(value);

  if (!_.isNaN(normalizedValue)) {
    return normalizedValue;
  } else {
    return value;
  }
}
