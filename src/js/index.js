require('../css/app.scss');
require('./slider')
import {getProducts} from './products';

var loginToken = localStorage.getItem("loginToken");
if (!loginToken) {
  window.location.href = "/login.html";
}

getProducts();
