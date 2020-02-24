import {serverUrl, newElement} from './helpers';

export function getProducts() {
  var loginToken = localStorage.getItem("loginToken");
  fetch(`${serverUrl}/api/watches`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${loginToken}`
    }
  })
    .then(response => response.json())
    .then(populateList);
}

function createItem(item) {
  var itemContainer = newElement("li");

  var image = newElement("img", null, { src: item.image });
  itemContainer.appendChild(image);

  var productInfo = newElement("div");
  var price = newElement("p", item.price, { class: "price test" });
  var description = newElement("p", item.description, { class: "description" });
  productInfo.appendChild(price);
  productInfo.appendChild(description);
  itemContainer.appendChild(productInfo);

  // var info = document.createElement("span");
  // info.innerText = item.info.model;
  // itemContainer.appendChild(info);
  return itemContainer;
}

function populateList(items) {
  var productsList = document.querySelector('.watches-list')
  for (var i = 0; i < items.length; i++) {
    var item = createItem(items[i]);
    productsList.appendChild(item);
  }
}
