export const serverUrl = "http://localhost:3000";

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