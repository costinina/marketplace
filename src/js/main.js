require('../css/main.scss');


var loginToken = localStorage.getItem("loginToken");
if (loginToken) {
  document.querySelector('.login').style.display = 'none'
  document.querySelector('.logout').style.display = 'inline-block'
} else {
  document.querySelector('.login').style.display = 'inline-block'
  document.querySelector('.logout').style.display = 'none'
}
document.querySelector('.logout').addEventListener('click', function(e){
  e.preventDefault();
  localStorage.removeItem('loginToken');
  window.location.reload();
})
