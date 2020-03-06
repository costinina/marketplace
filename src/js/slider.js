import { serverUrl, newElement } from './helpers';
require('../../node_modules/tiny-slider/dist/tiny-slider.css')
import { tns } from '../../node_modules/tiny-slider/src/tiny-slider';

function getCarouselProducts() {
  var loginToken = localStorage.getItem("loginToken");
  fetch(`${serverUrl}/api/products/carousel`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${loginToken}`
    }
  })
    .then(response => response.json())
    .then(items => {
      populateCarousel(items);
      console.log(items)

      var slider = tns({
        container: '.carousel',
        items: 1,
        gutter: '15',
        nav: false,
        controlsText: ['', ''],
        responsive: {
          640: {
            gutter: 15,
            items: 4
          }
        }
      });
    });
}

function populateCarousel(items) {
  var carouselList = document.querySelector('.carousel');
  for (let i = 0; i < items.length; i++) {
    let item = newElement('div', null, { class: "carousel-item" })
    let link = newElement('a', null, { href: `/product-details.html?productID=${items[i].id}`, class: "card" })
    let image = newElement('img', null, { src: items[i].thumbnail })
    link.appendChild(image);
    item.appendChild(link);
    carouselList.appendChild(item);

  }
}
getCarouselProducts();