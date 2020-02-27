
import { serverUrl, newElement } from './helpers'

function getProducts() {
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

function createProduct(item) {
  var product = newElement("div", null, { class: "column col-4" });
  var productContainer = newElement("div", null, { class: "card" });

  // Product Image, name and Price
  var image = newElement("img", null, { src: item.thumbnail });
  productContainer.appendChild(image);
  var name = newElement("h4", item.name, { class: "name"});
  productContainer.appendChild(name);
  var price = newElement("p", item.price, { class: "price" });
  productContainer.appendChild(price);

  // Product Actions
  var productActions = newElement("div", null, {class: "product-actions"});
  var more = newElement("a", 'View details', {href: item.image, class: "btn-secondary more" });
  productActions.appendChild(more);
  var addCart = newElement("a", 'Add to cart', {href: '#', class: "btn-primary addCart" });
  productActions.appendChild(addCart);
  productContainer.appendChild(productActions);


  product.appendChild(productContainer);
  return product;
}

function populateList(items) {
  var productsList = document.querySelector('.products-list')
  for (var i = 0; i < items.length; i++) {
    var item = createProduct(items[i]);
    productsList.appendChild(item);
  }
}

getProducts();