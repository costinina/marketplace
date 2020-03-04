import { newElement, formatCurrency } from "./helpers"

// Create an item in the cart
function createItems(item) {
  var cartItem = newElement("div", null, { class: "cart-item" });
  
  // Image
  var image = newElement("img", null, { src: item.thumbnail });
  cartItem.appendChild(image);
  
  // Name
  var name = newElement("h5", item.name, { class: "name" });
  cartItem.appendChild(name);
  
  // Price
  var price = newElement("h4", `<small>Price</small>${formatCurrency(item.price)}`, { class: "price" });
  cartItem.appendChild(price);

  // Subtotal
  var subtotal = newElement("h4", `<small>Subtotal</small>${formatCurrency(item.price * item.quantity)}`, { class: "price" });
  cartItem.appendChild(subtotal);
  
  // Quantity
  var quantity = newElement("select", item.price, { class: "quantity" });
  cartItem.appendChild(quantity);
  for (var i = 1; i <= 10; i++) {
    var option = newElement("option", i)
    option.value = i;
    option.selected = parseInt(item.quantity) === i;
    quantity.appendChild(option)
  }
  quantity.addEventListener('change', function () {
    window.cart.updateQuantity(item.id, this.value);
    renderCart(window.cart.getItems());
  });

  // Remove
  var remove = newElement("a", "Remove", { href: "#", class: "delete" });
  cartItem.appendChild(remove);
  remove.addEventListener("click", function (e) {
    e.preventDefault();
    window.cart.removeItem(item.id);
    renderCart(window.cart.getItems());
  })

  return cartItem;
}

// Creates the content of the cart
function renderCart(items) {
  var cartList = document.querySelector(".cart-list")
  cartList.innerHTML = ""

  if (items.length) {
    for (var i = 0; i < items.length; i++) {
      var item = createItems(items[i]);
      cartList.appendChild(item);
    }

    var cartTotal = newElement("div", null, {classList: "cart-total"});
    var title = newElement("h4", "Total: " + formatCurrency(window.cart.getTotal()))
    cartTotal.appendChild(title)
    cartList.appendChild(cartTotal)
  } else {
    var noProducts = newElement("p", "There are no items in your cart.", { classList: "no-items" })
    var backHome = newElement("a", "Back to products", { href: "/products.html", classList: "btn-primary" })
    cartList.appendChild(noProducts)
    cartList.appendChild(backHome)
  }
}

renderCart(window.cart.getItems());