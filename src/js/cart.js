import { newElement } from './helpers'

function createItems(item) {
  var cartItem = newElement("div", null, { class: "cart-item" });
  // Image
  var image = newElement("img", null, { src: item.thumbnail });
  cartItem.appendChild(image);
  // Name
  var name = newElement("h5", item.name, { class: "name" });
  cartItem.appendChild(name);
  // Price
  var price = newElement("h4", item.price, { class: "price" });
  cartItem.appendChild(price);
  // Quantity
  var quantity = newElement("select", item.price, { class: "quantity" });
  cartItem.appendChild(quantity);
  for (var i = 1; i <= 10; i++) {
    var option = newElement("option", i)
    option.value = i;
    quantity.appendChild(option)
  }
  // Remove
  var remove = newElement("a", "Remove", { href: "#", class: "delete" });
  cartItem.appendChild(remove);

  return cartItem;
}
function populateCart(items) {
  var cartList = document.querySelector('.cart-list')
  for (var i = 0; i < items.length; i++) {
    var item = createItems(items[i]);
    cartList.appendChild(item);
  }
}

populateCart(window.cart.getItems());