require('../css/main.scss');
import { serverUrl } from './helpers'

var loginToken = localStorage.getItem("loginToken");
if (loginToken) {
  window.location.href = "/";
}

function login(e) {
  e.preventDefault();
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var loginDetails = {
    email: email,
    password: password
  };

  fetch(`${serverUrl}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(loginDetails)
  })
    .then(response => response.json())
    .then(result => {
      localStorage.setItem("loginToken", result.token);
      window.location.href = "/";
    });
}

document.getElementById("login-form").addEventListener("submit", login);
