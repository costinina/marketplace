
var slider = tns({
  container: '.carousel',
  items: 3,
  gutter: '15',
  nav: false,
  controlsText: ['', '']
});

const serverUrl = "http://localhost:3000";
var loginToken = localStorage.getItem("loginToken");
if (!loginToken) {
  window.location.href = "/login.html";
}

function getWatches() {
  fetch(`${serverUrl}/api/watches`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${loginToken}`
    }
  })
    .then(response => response.json())
    .then(populateList);
}
getWatches();

function createItem(item) {
  var itemContainer = newElement("li");

  var image = newElement("img", null, { src: item.image });
  itemContainer.appendChild(image);

  var watchInfo = newElement("div");
  var price = newElement("p", item.price, { class: "price test" });
  var description = newElement("p", item.description, { class: "description" });
  watchInfo.appendChild(price);
  watchInfo.appendChild(description);
  itemContainer.appendChild(watchInfo);

  // var info = document.createElement("span");
  // info.innerText = item.info.model;
  // itemContainer.appendChild(info);
  return itemContainer;
}
function populateList(watches) {
  var watchesList = document.querySelector('.watches-list')
  for (var i = 0; i < watches.length; i++) {
    var watchItem = createItem(watches[i]);
    watchesList.appendChild(watchItem);
  }

}
