// ========================================
// DESTINATIONS DATABASE
// ========================================

const destinations = [
  {
    id: 1,
    name: "Kyoto",
    country: "Japan",
    category: ["culture", "food"],
    description:
      "Quiet temples, old streets and one of the most distinctive food cultures in the world.",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=85"
  },

  {
    id: 2,
    name: "Amalfi",
    country: "Italy",
    category: ["beach", "food"],
    description:
      "Mediterranean cliffs, tiny coastal towns and long afternoons beside the sea.",
    image:
      "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&w=1200&q=85"
  },

  {
    id: 3,
    name: "Copenhagen",
    country: "Denmark",
    category: ["city", "food"],
    description:
      "Architecture, bicycles, Nordic food and a city designed around everyday life.",
    image:
      "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=1200&q=85"
  },

  {
    id: 4,
    name: "Patagonia",
    country: "Argentina",
    category: ["nature"],
    description:
      "Enormous landscapes, glacial lakes and trails where civilization feels very far away.",
    image:
      "https://images.unsplash.com/photo-1531761535209-180857e963b9?auto=format&fit=crop&w=1200&q=85"
  },

  {
    id: 5,
    name: "Marrakech",
    country: "Morocco",
    category: ["culture", "food"],
    description:
      "Markets, courtyards, architecture and color layered through centuries of history.",
    image:
      "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=1200&q=85"
  },

  {
    id: 6,
    name: "Madeira",
    country: "Portugal",
    category: ["nature", "beach"],
    description:
      "Volcanic cliffs, subtropical forests and dramatic Atlantic landscapes.",
    image:
      "https://images.unsplash.com/photo-1589553416260-f586c8f1514f?auto=format&fit=crop&w=1200&q=85"
  },

  {
    id: 7,
    name: "Rio de Janeiro",
    country: "Brazil",
    category: ["city", "beach", "nature"],
    description:
      "A city where mountains, neighborhoods, music and the Atlantic collide.",
    image:
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=85"
  },

  {
    id: 8,
    name: "Reykjavík",
    country: "Iceland",
    category: ["city", "nature"],
    description:
      "A small northern capital surrounded by some of Earth's strangest landscapes.",
    image:
      "https://images.unsplash.com/photo-1504829857797-ddff29c27927?auto=format&fit=crop&w=1200&q=85"
  },

  {
    id: 9,
    name: "Bali",
    country: "Indonesia",
    category: ["nature", "beach", "culture"],
    description:
      "Rice fields, temples, tropical coastline and an island shaped by ritual.",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85"
  },

  {
    id: 10,
    name: "Paris",
    country: "France",
    category: ["city", "culture", "food"],
    description:
      "Architecture, cafés, galleries and neighborhoods made for wandering without a plan.",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=85"
  },

  {
    id: 11,
    name: "Cape Town",
    country: "South Africa",
    category: ["city", "nature", "beach"],
    description:
      "Mountains, ocean and an energetic city occupying one extraordinary corner of Africa.",
    image:
      "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1200&q=85"
  },

  {
    id: 12,
    name: "Santorini",
    country: "Greece",
    category: ["beach", "culture"],
    description:
      "White villages perched above the Aegean and sunsets worth slowing down for.",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=85"
  }
];


// ========================================
// ELEMENTS
// ========================================

const destinationsGrid =
  document.getElementById("destinationsGrid");

const searchInput =
  document.getElementById("searchInput");

const searchButton =
  document.getElementById("searchButton");

const categories =
  document.querySelectorAll(".category");

const resultsCount =
  document.getElementById("resultsCount");

const resultsTitle =
  document.getElementById("resultsTitle");

const emptyState =
  document.getElementById("emptyState");

const resetSearch =
  document.getElementById("resetSearch");

const clearFilters =
  document.getElementById("clearFilters");

const favoritesCount =
  document.getElementById("favoritesCount");

const favoritesButton =
  document.getElementById("favoritesButton");

const menuButton =
  document.getElementById("menuButton");

const mobileNav =
  document.getElementById("mobileNav");

const toast =
  document.getElementById("toast");


// ========================================
// APPLICATION STATE
// ========================================

let selectedCategory = "all";

let searchTerm = "";

let showFavoritesOnly = false;

let favorites =
  JSON.parse(localStorage.getItem("atlasFavorites")) || [];


// ========================================
// CREATE DESTINATION CARDS
// ========================================

function renderDestinations() {

  let filteredDestinations =
    destinations.filter((destination) => {

      const matchesSearch =
        destination.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||

        destination.country
          .toLowerCase()
          .includes(searchTerm.toLowerCase());


      const matchesCategory =
        selectedCategory === "all" ||
        destination.category.includes(selectedCategory);


      const matchesFavorites =
        !showFavoritesOnly ||
        favorites.includes(destination.id);


      return (
        matchesSearch &&
        matchesCategory &&
        matchesFavorites
      );

    });


  destinationsGrid.innerHTML = "";


  if (filteredDestinations.length === 0) {

    emptyState.classList.add("visible");

  } else {

    emptyState.classList.remove("visible");

  }


  filteredDestinations.forEach(
    (destination, index) => {

      const isFavorite =
        favorites.includes(destination.id);


      const card =
        document.createElement("article");


      card.className =
        "destination-card";


      card.innerHTML = `
        <div class="card-image">

          <img
            src="${destination.image}"
            alt="${destination.name}, ${destination.country}"
            loading="lazy"
          >

          <span class="card-number">
            ${String(index + 1).padStart(2, "0")}
          </span>

          <button
            class="favorite-icon ${isFavorite ? "active" : ""}"
            data-id="${destination.id}"
            aria-label="Favoritar ${destination.name}"
          >
            ${isFavorite ? "♥" : "♡"}
          </button>

        </div>

        <div class="card-content">

          <div class="card-top">

            <h3>
              ${destination.name}
            </h3>

            <span class="card-country">
              ${destination.country}
            </span>

          </div>

          <p class="card-description">
            ${destination.description}
          </p>

          <div class="card-tags">

            ${destination.category
              .map(
                (category) =>
                  `<span class="card-tag">${category}</span>`
              )
              .join("")}

          </div>

        </div>
      `;


      destinationsGrid.appendChild(card);

    }
  );


  updateResultsCount();

  addFavoriteListeners();

}


// ========================================
// RESULTS COUNTER
// ========================================

function updateResultsCount() {

  const cards =
    document.querySelectorAll(".destination-card");

  resultsCount.textContent =
    `${cards.length} ${
      cards.length === 1
        ? "destination"
        : "destinations"
    }`;

}


// ========================================
// FAVORITES
// ========================================

function toggleFavorite(id) {

  if (favorites.includes(id)) {

    favorites =
      favorites.filter(
        (favoriteId) =>
          favoriteId !== id
      );

    showToast(
      "Removed from favorites"
    );

  } else {

    favorites.push(id);

    showToast(
      "Added to favorites"
    );

  }


  localStorage.setItem(
    "atlasFavorites",
    JSON.stringify(favorites)
  );


  updateFavoritesCount();

  renderDestinations();

}


function addFavoriteListeners() {

  const buttons =
    document.querySelectorAll(
      ".favorite-icon"
    );


  buttons.forEach((button) => {

    button.addEventListener(
      "click",
      (event) => {

        event.stopPropagation();

        const id =
          Number(button.dataset.id);

        toggleFavorite(id);

      }
    );

  });

}


function updateFavoritesCount() {

  favoritesCount.textContent =
    favorites.length;

}


// ========================================
// SEARCH
// ========================================

function performSearch() {

  searchTerm =
    searchInput.value.trim();

  showFavoritesOnly = false;

  resultsTitle.textContent =
    searchTerm
      ? `Results for “${searchTerm}”`
      : "Places worth the distance.";

  renderDestinations();


  document
    .getElementById("explore")
    .scrollIntoView({
      behavior: "smooth"
    });

}


searchButton.addEventListener(
  "click",
  performSearch
);


searchInput.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Enter") {

      performSearch();

    }

  }
);


searchInput.addEventListener(
  "input",
  () => {

    searchTerm =
      searchInput.value.trim();

    showFavoritesOnly = false;

    renderDestinations();

  }
);


// ========================================
// CATEGORY FILTER
// ========================================

categories.forEach((categoryButton) => {

  categoryButton.addEventListener(
    "click",
    () => {

      categories.forEach(
        (button) =>
          button.classList.remove("active")
      );


      categoryButton
        .classList.add("active");


      selectedCategory =
        categoryButton.dataset.category;


      showFavoritesOnly = false;


      resultsTitle.textContent =
        selectedCategory === "all"
          ? "Places worth the distance."
          : `${capitalize(selectedCategory)} destinations`;


      renderDestinations();

    }
  );

});


// ========================================
// CLEAR FILTERS
// ========================================

clearFilters.addEventListener(
  "click",
  resetEverything
);


resetSearch.addEventListener(
  "click",
  resetEverything
);


function resetEverything() {

  selectedCategory = "all";

  searchTerm = "";

  showFavoritesOnly = false;

  searchInput.value = "";

  resultsTitle.textContent =
    "Places worth the distance.";


  categories.forEach(
    (button) =>
      button.classList.remove("active")
  );


  document
    .querySelector(
      '[data-category="all"]'
    )
    .classList.add("active");


  renderDestinations();

}


// ========================================
// SHOW FAVORITES
// ========================================

favoritesButton.addEventListener(
  "click",
  () => {

    showFavoritesOnly =
      !showFavoritesOnly;


    if (showFavoritesOnly) {

      resultsTitle.textContent =
        "Your saved places.";

      showToast(
        "Showing your favorites"
      );

    } else {

      resultsTitle.textContent =
        "Places worth the distance.";

    }


    renderDestinations();


    document
      .getElementById("explore")
      .scrollIntoView({
        behavior: "smooth"
      });

  }
);


// ========================================
// MOBILE MENU
// ========================================

menuButton.addEventListener(
  "click",
  () => {

    mobileNav.classList.toggle("open");

  }
);


mobileNav
  .querySelectorAll("a")
  .forEach((link) => {

    link.addEventListener(
      "click",
      () => {

        mobileNav
          .classList
          .remove("open");

      }
    );

  });


// ========================================
// TOAST MESSAGE
// ========================================

let toastTimeout;


function showToast(message) {

  clearTimeout(toastTimeout);

  toast.textContent =
    message;

  toast.classList.add(
    "visible"
  );


  toastTimeout =
    setTimeout(() => {

      toast.classList.remove(
        "visible"
      );

    }, 2000);

}


// ========================================
// HELPER
// ========================================

function capitalize(text) {

  return (
    text.charAt(0).toUpperCase() +
    text.slice(1)
  );

}


// ========================================
// CURRENT YEAR
// ========================================

document.getElementById(
  "currentYear"
).textContent =
  new Date().getFullYear();


// ========================================
// INITIALIZE APPLICATION
// ========================================

updateFavoritesCount();

renderDestinations();