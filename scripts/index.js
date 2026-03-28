function viewmore() {
  window.location.href = "phones.html";
}

function createHomepageCard(item) {
  const card = document.createElement("article");
  card.className = "product-card";

  const media = document.createElement("div");
  media.className = "product-card__media";

  const button = document.createElement("button");
  button.type = "button";
  button.className = "product-card__favorite head_button";
  button.setAttribute("aria-label", "Save listing");
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    button.classList.toggle("is-favorited");
  });

  const iTag = document.createElement("i");
  iTag.classList.add("fa-solid", "fa-heart");
  button.append(iTag);

  const imge = document.createElement("img");
  imge.src = item?.image_src || "";
  imge.alt = "";
  imge.addEventListener("click", () => {
    function_ls(item);
    document.location.href = "productdetails.html";
  });

  media.append(button, imge);

  const body = document.createElement("div");
  body.className = "product-card__body";

  const price = document.createElement("h3");
  price.className = "product-card__price";
  price.textContent = "₹ " + item.price;

  const title = document.createElement("p");
  title.className = "product-card__title";
  title.textContent = item.title;

  const location = document.createElement("p");
  location.className = "product-card__location";
  location.textContent = item.location;

  const date = document.createElement("p");
  date.className = "product-card__date";
  date.textContent = item.date;

  body.append(price, title, location, date);
  card.append(media, body);
  return card;
}

// * ------------------------>> FETCH DATA  <<-------------------------------------
async function fetchData() {
  try {
    let res = await getHomepageProducts();
    displayData(res);
  } catch (error) {
    alert(error);
  }
}
fetchData();

// * ------------------------>> DISPLAY DATA <<-------------------------------------
let scnd_div = document.querySelector("#homepage_scnd_child");
function displayData(data) {
  scnd_div.innerHTML = "";
  const initialCount = Math.min(21, data.length);
  for (let i = 0; i < initialCount; i++) {
    scnd_div.append(createHomepageCard(data[i]));
  }

  const load_more = document.querySelector("#homepage_load_more");
  load_more.onclick = () => {
    for (let i = initialCount; i < data.length; i++) {
      scnd_div.append(createHomepageCard(data[i]));
    }
    load_more.style.display = "none";
  };
  load_more.style.display = data.length > initialCount ? "inline-block" : "none";
}

let headButton = document.querySelectorAll(".head_button");
for (let i = 0; i < headButton.length; i++) {
  headButton[i].addEventListener("click", (event) => {
    event.stopPropagation();
    headButton[i].classList.toggle("is-favorited");
  });
}

// * -------------------------->> LS <<---------------------------------
function function_ls(obj) {
  localStorage.setItem("local_Key", JSON.stringify([obj]));
}
