import { serverUrl, newElement, camelCaseToWords } from './helpers'

// get the ID of the product
var pieces = document.location.search.replace('?', '').split('&')
var productID;
for (var i = 0; i < pieces.length; i++) {
  if (pieces[i].indexOf('productID=') === 0) {
    productID = pieces[i].replace('productID=', '')
  }
}
if (productID) {
  getProduct(productID)
}

// Get the product from the API
function getProduct(id) {
  var loginToken = localStorage.getItem("loginToken");
  fetch(`${serverUrl}/api/watches/${id}`, {
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
  
  for(var i in product) {
    if (details.indexOf(i) !== -1) {
      // header row for the table
      var row = newElement("tr", null, {classList: "header"})
      var cell = newElement("th", camelCaseToWords(i), {colspan: 2})
      row.appendChild(cell)
      table.appendChild(row)

      // create the properties
      for(var j in product[i]) {
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
  var li = newElement("li", null, {classList: "active"});
  var link = newElement("a", product.name, {href: "#"});
  li.appendChild(link);
  document.querySelector(".menu").appendChild(li);

  // add the title
  document.querySelector(".product-title").innerHTML = product.name;

  // add the image
  var image = newElement("img", null, {src: product.image});
  document.querySelector(".image-container").appendChild(image)

  // add the description
  document.querySelector(".product-description").innerHTML = product.description;

  // create and add the details table
  var detailsTable = generateDetailsTable(product);
  document.querySelector(".product-table").appendChild(detailsTable);

  console.log(product)
}