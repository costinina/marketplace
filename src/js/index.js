const serverUrl = "http://localhost:3000";
var loginToken = localStorage.getItem("loginToken");
if (!loginToken) {
  window.location.href = "/login.html";
}

function getWatches(){
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
    var itemContainer = document.createElement("li");

    // var description = document.createElement("p");
    // description.innerText = item.description;
    // itemContainer.appendChild(description);

    var image = document.createElement("img");
    image.src = item.image;
    itemContainer.appendChild(image);

    var watchInfo = document.createElement("div");
    watchInfo.innerHTML = `<p class="price">${item.price}</p><p class="description">${item.description}</p>`;
    itemContainer.appendChild(watchInfo)

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
