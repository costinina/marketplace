import { IncomingMessage } from "http"

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

    if (typeof item[0] !== 'undefined'){
      return item[0]
    }

    return false;
  }

  // Add a new item to cart or increase quantity
  function addItem(item) {
    let existing = getItem(item.id)
    
    if (existing) {
      existing.quantity++
    } else {
      item.quantity = 1
      items.push(item)
    }
    sessionStorage.setItem('cart', JSON.stringify(items))

    updateMiniCart()
  }

  function updateMiniCart() {
    document.querySelector('.total-count').innerHTML = getCount()
  }

  function getTotal() {
    let total = 0;

    for (let i = 0; i < items.length; i++) {
      total += parseFloat(items[i].price.replace('$', '')) * items[i].quantity
    }

    return total.toFixed(2);
  }

  function getCount() {
    let count = 0

    for (let i = 0; i < items.length; i++) {
      count += items[i].quantity
    }

    return count
  }
  function getItems(){
  return items
  }

  return {
    init,
    addItem,
    getTotal,
    getCount,
    getItems
  }
}