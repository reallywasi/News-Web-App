const API_KEY = "47b5bc1a3de04f40b657feac3f6a043d";
const url = "https://newsapi.org/v2/everything?q=";
window.addEventListener("load", () => fetchNews("Trending"));
// window load hote hi fetcheNews() call ho jaye with value India as hume pehle India ki search karni hai

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
  const data = await res.json();
  //   console.log(data);
  bindData(data.articles);
}

// function reload{
//     window.location.reload();  // js function to reload the whole page

// }

function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");
  cardsContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = newsCardTemplate.content.cloneNode(true); // iska matlab hum deep cloning karna chahte hai // div ke andar div bhi clone ho jayenge
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}

function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");
  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;
  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  newsSource.innerHTML = `${article.source.name}.${date}`;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}
let currentSelectedNav = null;

function onNavItemClick(id) {
  fetchNews(id);

  // now jispe click kara hai usko blue banana hai to use ek active class deni padegi
  const navItem = document.getElementById(id);
  currentSelectedNav?.classlist.remove("active");
  currentSelectedNav = navItem;
  currentSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
  const query = searchText.value;
  if (!query)
    // agar user ne kuch nahi likha ie query nahi aaayi to us case me bas return kar dega
    return;
  fetchNews(query);
  currentSelectedNav?.classList.remove("active");

    currentSelectedNav = null;
});
