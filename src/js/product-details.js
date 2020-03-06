import { serverUrl, newElement, camelCaseToWords, formatCurrency, getQueryString } from './helpers'

var productID = getQueryString('productID')
if (productID) {
  getProduct(productID)
}

// Get the product from the API
function getProduct(id) {
  var loginToken = localStorage.getItem("loginToken");
  fetch(`${serverUrl}/api/products/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${loginToken}`
    }
  })
    .then(response => response.json())
    .then(populatePage);
}

function generateDetailsTable(product) {
  var table = newElement("table")
  var details = ["info", "calibre", "case", "strap"]

  for (var i in product) {
    if (details.indexOf(i) !== -1) {
      // header row for the table
      var row = newElement("tr", null, { classList: "header" })
      var cell = newElement("th", camelCaseToWords(i), { colspan: 2 })
      row.appendChild(cell)
      table.appendChild(row)

      // create the properties
      for (var j in product[i]) {
        var property = newElement("tr")
        var propertyName = newElement("td", camelCaseToWords(j))
        var propertyValue = newElement("td", product[i][j])
        property.appendChild(propertyName)
        property.appendChild(propertyValue)
        table.appendChild(property)
      }
    }
  }

  return table
}

// Add the content to the page
function populatePage(product) {
  // set the title of the page
  document.querySelector("head title").innerHTML = `Marketplace - ${product.name}`;

  // add the breadcrumb
  var li = newElement("li", null, { classList: "active" });
  var link = newElement("a", product.name, { href: "#" });
  li.appendChild(link);
  document.querySelector(".menu").appendChild(li);

  // add the title
  document.querySelector(".product-title").innerHTML = product.name;

  // add the image
  var image = newElement("img", null, { src: product.image });
  document.querySelector(".image-container").appendChild(image)

  // add the description
  document.querySelector(".product-description").innerHTML = product.description;

  // create and add the details table
  var detailsTable = generateDetailsTable(product);
  document.querySelector(".product-table").appendChild(detailsTable);

  // addthe price in product summary
  document.querySelector(".price").innerHTML = formatCurrency(product.price);

  // add to cart button functionality
  document.querySelector('.product-addToCart').addEventListener('click', function (e) {
    e.preventDefault();
    window.cart.addItem(product, getCurrentNumber());
  })

  // decrease quantity
  document.querySelector('.quantity .remove').addEventListener('click', function (e) {
    e.preventDefault()
    var current = getCurrentNumber()
    current -= 1;
    if (current < 1) {
      current = 1
    }
    setCurrentNumber(current)
  })

  // increase quantity
  document.querySelector('.quantity .add').addEventListener('click', function (e) {
    e.preventDefault()
    var current = getCurrentNumber()
    current += 1;
    if (current > 10) {
      current = 10
    }
    setCurrentNumber(current)
  })
}

// Get the current number of items to add to cart
function getCurrentNumber(){
  return parseInt(document.querySelector('.quantity .value').innerText)
}

// Set the current number of items to add to cart
function setCurrentNumber(value) {
  document.querySelector('.quantity .value').innerText = value
}

