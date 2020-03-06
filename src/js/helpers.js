export const serverUrl = "http://localhost:3000";

// Creates new elements
export function newElement(tag, content = "", attributes = {}) {
  if (typeof tag === 'undefined') {
    return document.createElement("div");
  }

  const element = document.createElement(tag);

  if (content) {
    element.innerHTML = content;
  }

  for (let i in attributes) {
    if (i.indexOf('data-') === 0) {
      element.dataset[i.substr(5)] = attributes[i];
    } else if (i === 'class') {
      element.className = attributes[i];
    } else {
      element[i] = attributes[i];
    }
  }

  return element;
}

// Format a number as a currency
export function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}

// Create words from a camel case string
export function camelCaseToWords(camelCase) {
  var result = camelCase.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1).trim()
}

// Get the value of a key in the query string
export function getQueryString(key) {
  var pieces = document.location.search.replace('?', '').split('&')
  for (var i = 0; i < pieces.length; i++) {
    if (pieces[i].indexOf(`${key}=`) === 0) {
      return pieces[i].replace(`${key}=`, '')
    }
  }

  return null;
}