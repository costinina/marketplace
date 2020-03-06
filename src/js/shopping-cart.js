export default function () {
  let items = []

  // Load cart from session storage if it exists
  function init() {
    let existingCart = sessionStorage.getItem('cart')
    if (existingCart) {
      items = JSON.parse(existingCart)
    }

    updateMiniCart()
  }

  // Get an item from cart by ID
  function getItem(itemID) {
    let item = items.filter(item => item.id === itemID)

    if (typeof item[0] !== 'undefined') {
      return item[0]
    }

    return false;
  }

  // Add a new item to cart or increase quantity
  function addItem(item, quantity = 1) {
    let existing = getItem(item.id)

    if (existing) {
      existing.quantity += quantity
    } else {
      item.quantity = quantity
      items.push(item)
    }
    sessionStorage.setItem('cart', JSON.stringify(items))

    updateMiniCart()
  }

  // Update the number of items in the minicart
  function updateMiniCart() {
    document.querySelector('.total-count').innerHTML = getCount()
  }

  // Get the total amount in the cart
  function getTotal() {
    let total = 0;

    for (let i = 0; i < items.length; i++) {
      total += parseFloat(items[i].price) * items[i].quantity
    }

    return total.toFixed(2);
  }

  // Get the total number of items in the cart
  function getCount() {
    let count = 0

    for (let i = 0; i < items.length; i++) {
      count += parseInt(items[i].quantity)
    }

    return count
  }

  // Update the quantity of an item in the cart
  function updateQuantity(itemID, quantity) {
    var item = getItem(itemID)
    if (item) {
      item.quantity = quantity
      updateMiniCart()
      sessionStorage.setItem('cart', JSON.stringify(items))
    }
  }

  // Removes an item from the cart
  function removeItem(itemID) {
    items = items.filter(item => item.id !== itemID)
    sessionStorage.setItem('cart', JSON.stringify(items))

    updateMiniCart()
  }

  // Get the items in the cart
  function getItems() {
    return items
  }

  return {
    init,
    addItem,
    removeItem,
    updateQuantity,
    getTotal,
    getCount,
    getItems
  }
}