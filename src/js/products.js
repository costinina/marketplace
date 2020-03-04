import { serverUrl, newElement, formatCurrency } from './helpers'

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
  var price = newElement("p", formatCurrency(item.price), { class: "price" });
  productContainer.appendChild(price);

  // Product Actions
  var productActions = newElement("div", null, {class: "product-actions"});
  var more = newElement("a", 'View details', {href: `/product-details.html?productID=${item.id}`, class: "btn-secondary more" });
  productActions.appendChild(more);
  var addToCart = newElement("a", 'Add to cart', {href: '#', class: "btn-primary addToCart" });
  productActions.appendChild(addToCart);
  productContainer.appendChild(productActions);
  
  // add item to cart
  addToCart.addEventListener("click", function (e) {
    e.preventDefault()
    window.cart.addItem(item)
  });


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