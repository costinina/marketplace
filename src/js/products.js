import { serverUrl, newElement, formatCurrency, getQueryString } from './helpers'

// this holds the original products returned by the API
var apiProducts = []

// this holds the active filters
var activeFilters = {
  brands: [],
  models: [],
  genders: [],
}

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
    .then(items => {
      apiProducts = items;
      populateList(items)
    });
}

function createProduct(item) {
  var product = newElement("div", null, { class: "column col-4" });
  var productContainer = newElement("div", null, { class: "card" });

  // Product Image, name and Price
  var image = newElement("img", null, { src: item.thumbnail });
  productContainer.appendChild(image);
  var name = newElement("h4", item.name, { class: "name" });
  productContainer.appendChild(name);
  var price = newElement("p", formatCurrency(item.price), { class: "price" });
  productContainer.appendChild(price);

  // Product Actions
  var productActions = newElement("div", null, { class: "product-actions" });
  var more = newElement("a", 'View details', { href: `/product-details.html?productID=${item.id}`, class: "btn-secondary more" });
  productActions.appendChild(more);
  var addToCart = newElement("a", 'Add to cart', { href: '#', class: "btn-primary addToCart" });
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
  var productsList = document.querySelector('.products-list');
  var filteringSidebar = document.querySelector('.sidebar.filter')
  productsList.innerHTML = ''

  // perform the search
  var search = getQueryString('q');
  if (search) {
    items = items.filter(i => i.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
  }

  // if there are no products
  if (!items.length) {
    var noProducts = newElement('div', 'There are no products to display.', { classList: 'no-products' })
    productsList.appendChild(noProducts)
    filteringSidebar.style.display = 'none';
  } else {
    createFilters(items);
    filteringSidebar.style.display = 'block'
    for (var i = 0; i < items.length; i++) {
      var item = createProduct(items[i]);
      productsList.appendChild(item);
    }
  }
}

function applyFiltering() {
  let items = [];

  if (activeFilters.models.length || activeFilters.brands.length || activeFilters.genders.length) {
    items = apiProducts.filter(p => {
      // check models, brands and genders. If there are no filters for one of them
      // or if the products matches the active filters, returns true
      return (!activeFilters.models.length || activeFilters.models.indexOf(p.info.model) !== -1) &&
        (!activeFilters.brands.length || activeFilters.brands.indexOf(p.info.brand) !== -1) &&
        (!activeFilters.genders.length || activeFilters.genders.indexOf(p.info.gender) !== -1)
    })
  } else {
    // use all of the original products
    items = apiProducts
  }

  var productsList = document.querySelector('.products-list');
  productsList.innerHTML = ''
  for (var i = 0; i < items.length; i++) {
    productsList.appendChild(createProduct(items[i]));
  }
}

function createFilters(items) {
  let brands = [];
  let models = [];
  let genders = [];

  for (let i = 0; i < items.length; i++) {
    // colect brands
    if (brands.indexOf(items[i].info.brand) === -1) {
      brands.push(items[i].info.brand)
    }

    // colect models
    if (models.indexOf(items[i].info.model) === -1) {
      models.push(items[i].info.model)
    }

    // colect genders
    if (genders.indexOf(items[i].info.gender) === -1) {
      genders.push(items[i].info.gender)
    }
  }

  generateFiltersHtml(brands, models, genders)
}

function generateFiltersHtml(brands, models, genders) {
  let filters = document.querySelector('.sidebar.filter .available-filters');
  filters.innerHTML = '';
  filters.appendChild(generateFiltersSection(brands, 'Brands', 'brands'))
  // filters.appendChild(generateFiltersSection(models, 'Models', 'models'))
  filters.appendChild(generateFiltersSection(genders, 'Genders', 'genders'))
}

function generateFiltersSection(items, titleString, key) {
  let wrapper = newElement('div', null, {class: 'filter-category'})

  // add the title
  let title = newElement('h4', titleString)
  wrapper.appendChild(title)

  // create the checkboxes
  for (let i = 0; i < items.length; i++) {
    wrapper.appendChild(filterCheckbox(items[i], key))
  }

  return wrapper
}

function filterCheckbox(filter, key) {
  let label = newElement('label')

  // add the input
  let input = newElement('input', null, { type: 'checkbox', 'value': filter, 'data-key': key })
  label.appendChild(input)

  // add the text
  let span = newElement('span', filter)
  label.appendChild(span)

  return label
}

function toggleFilter(key, value) {
  if (activeFilters[key].indexOf(value) !== -1) {
    activeFilters[key] = activeFilters[key].filter(i => i !== value)
  } else {
    activeFilters[key].push(value)
  }
}

// Create the event listener for the filtering inputs
document.querySelector('.available-filters').addEventListener('change', function (e) {
  e.preventDefault()
  if (e.target.nodeName.toLowerCase() === 'input') {
    toggleFilter(e.target.dataset.key, e.target.value)
    applyFiltering()
  }
})

getProducts();