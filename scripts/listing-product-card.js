(function () {
  function goToDetails(item) {
    localStorage.setItem("local_Key", JSON.stringify([item]));
    document.location.href = "productdetails.html";
  }

  /**
   * @param {object} item - listing row from JSON
   * @param {{ showTraveled?: boolean }} options - show km line on bikes
   */
  window.createListingProductCard = function (item, options) {
    options = options || {};
    var showTraveled = options.showTraveled === true;

    var card = document.createElement("article");
    card.className = "product-card";

    var media = document.createElement("div");
    media.className = "product-card__media";

    var fav = document.createElement("button");
    fav.type = "button";
    fav.className = "product-card__favorite";
    fav.setAttribute("aria-label", "Save listing");
    fav.innerHTML = '<i class="fa-solid fa-heart"></i>';
    fav.addEventListener("click", function (e) {
      e.stopPropagation();
      fav.classList.toggle("is-favorited");
    });

    var img = document.createElement("img");
    img.src = item.image_src || "";
    img.alt = "";
    img.addEventListener("click", function () {
      goToDetails(item);
    });

    media.append(fav, img);

    var body = document.createElement("div");
    body.className = "product-card__body";

    var price = document.createElement("h3");
    price.className = "product-card__price";
    price.textContent = "₹ " + item.price;

    var title = document.createElement("p");
    title.className = "product-card__title";
    title.textContent = item.title;
    title.addEventListener("click", function () {
      goToDetails(item);
    });

    body.appendChild(price);
    body.appendChild(title);

    if (showTraveled && item.traveled) {
      var meta = document.createElement("p");
      meta.className = "product-card__meta";
      meta.textContent = item.traveled;
      body.appendChild(meta);
    }

    var location = document.createElement("p");
    location.className = "product-card__location";
    location.textContent = item.location;

    var date = document.createElement("p");
    date.className = "product-card__date";
    date.textContent = item.date;

    body.appendChild(location);
    body.appendChild(date);

    card.appendChild(media);
    card.appendChild(body);
    return card;
  };
})();
