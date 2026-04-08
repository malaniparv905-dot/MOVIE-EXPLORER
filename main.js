
const API_KEY = "1f5fa721";

window.currentMovies = [];
window.favorites = {};
window.currentSearchKeyword = "";
window.currentPageNumber = 1;

const searchBtn = document.getElementById("searchBtn");
const movieInput = document.getElementById("movieInput");
const movieContainer = document.getElementById("movies");
const loader = document.getElementById("loader");
const errorMessage = document.getElementById("error-message");
const controlsToolbar = document.getElementById("controlsToolbar");
const sortSelect = document.getElementById("sortSelect");

const themeToggle = document.getElementById("themeToggle");
const themeText = document.querySelector(".theme-text");
const themeIcon = themeToggle.querySelector(".icon");


themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    if (document.body.classList.contains("light-theme")) {
        themeText.textContent = "Dark Mode";
        themeIcon.textContent = "🌙";
    } else {
        themeText.textContent = "Light Mode";
        themeIcon.textContent = "☀️";
    }
});


window.applyGenreTheme = function (themeClass) {
    const isLight = document.body.classList.contains("light-theme");
    document.body.className = "";
    if (isLight) document.body.classList.add("light-theme");
    if (themeClass) document.body.classList.add(themeClass);
};


const modalOverlay = document.createElement("div");
modalOverlay.classList.add("modal-overlay");
document.body.appendChild(modalOverlay);

modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) window.closeModal();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) window.closeModal();
});

window.closeModal = function () {
    modalOverlay.classList.remove("active");
    setTimeout(() => { modalOverlay.innerHTML = ""; }, 300);
}


const categoryLinks = document.querySelectorAll(".sidebar-link");
categoryLinks.forEach(link => {
    link.addEventListener("click", () => {
        categoryLinks.forEach(p => p.classList.remove("active"));
        link.classList.add("active");
    });
});


searchBtn.addEventListener("click", handleSearch);
movieInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSearch();
});

function handleSearch() {
    const movieName = movieInput.value.trim();
    if (movieName === "") {
        showError("Please enter a movie name.");
        return;
    }
    categoryLinks.forEach(p => p.classList.remove("active"));
    window.applyGenreTheme("");

    window.currentSearchKeyword = movieName;
    window.currentPageNumber = 1;
    fetchMoviesBySearch(movieName, 1, false);
}

function showError(msg) {
    errorMessage.textContent = msg;
    errorMessage.classList.remove("hidden");
    movieContainer.innerHTML = "";
    loader.classList.add("hidden");
    controlsToolbar.classList.add("hidden");
}

function hideError() {
    errorMessage.classList.add("hidden");
    errorMessage.textContent = "";
}


window.fetchDynamicGenre = async function (keywordsArray) {
    const randomKeyword = keywordsArray[Math.floor(Math.random() * keywordsArray.length)];
    const randomPage = Math.floor(Math.random() * 3) + 1;
    movieInput.value = "";

    window.currentSearchKeyword = randomKeyword;
    window.currentPageNumber = randomPage;
    await fetchMoviesBySearch(randomKeyword, randomPage, false);
}


async function fetchMoviesBySearch(searchTerm, page = 1, append = false) {
    hideError();
    if (!append) {
        controlsToolbar.classList.add("hidden");
        movieContainer.innerHTML = "";
    }
    loader.classList.remove("hidden");

    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}&page=${page}`);
        const data = await response.json();
        loader.classList.add("hidden");

        if (data.Response === "True") {
            if (append) {
                window.currentMovies = window.currentMovies.concat(data.Search);
            } else {
                window.currentMovies = data.Search;
            }
            controlsToolbar.classList.remove("hidden");
            window.applyFiltersAndSort();

            document.getElementById('loadMoreBtn').classList.remove('hidden');
        } else {
            document.getElementById('loadMoreBtn').classList.add('hidden');
            if (page > 1 && !append) {
                window.currentSearchKeyword = searchTerm;
                window.currentPageNumber = 1;
                fetchMoviesBySearch(searchTerm, 1, false);
            } else if (!append) {
                showError(data.Error || "No movies found 😢");
            }
        }
    } catch (error) {
        loader.classList.add("hidden");
        document.getElementById('loadMoreBtn').classList.add('hidden');
        if (!append) showError("Error fetching data. Please check your connection. ⚠️");
        console.error(error);
    }
}

document.getElementById("loadMoreBtn").addEventListener("click", () => {
    window.currentPageNumber++;
    fetchMoviesBySearch(window.currentSearchKeyword, window.currentPageNumber, true);
});

window.showLikedMovies = function () {
    hideError();
    movieInput.value = "";
    document.getElementById("loadMoreBtn").classList.add("hidden");

    const likedArray = Object.values(window.favorites);
    if (likedArray.length === 0) {
        movieContainer.innerHTML = `<p class="error">You haven't liked any movies yet! 🤍</p>`;
        controlsToolbar.classList.add("hidden");
        window.currentMovies = [];
        return;
    }

    window.currentMovies = likedArray;
    controlsToolbar.classList.remove("hidden");
    window.applyFiltersAndSort();
}

window.applyFiltersAndSort = function () {
    if (!window.currentMovies || window.currentMovies.length === 0) return;

    let processedMovies = [...window.currentMovies];

    const sortVal = sortSelect.value;
    processedMovies.sort((a, b) => {
        if (sortVal === "year-desc") {
            return parseInt(b.Year) - parseInt(a.Year);
        } else if (sortVal === "year-asc") {
            return parseInt(a.Year) - parseInt(b.Year);
        } else if (sortVal === "title-asc") {
            return a.Title.localeCompare(b.Title);
        }
        return 0;
    });

    displayMovies(processedMovies);
}

sortSelect.addEventListener("change", window.applyFiltersAndSort);


document.addEventListener("click", (e) => {
    if (e.target.classList.contains("filter-btn")) {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");
        const category = e.target.getAttribute("data-category");
        if (category !== "Home") {
            document.querySelectorAll(".sidebar-link").forEach(b => b.classList.remove("active"));
        } else {
            document.querySelector('.sidebar-link[data-category="Home"]').classList.add("active");
        }
    }
    if (e.target.closest('.sidebar-link') && e.target.closest('.sidebar-link').getAttribute("data-category") === "Home") {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        document.querySelector('.filter-btn[data-category="Home"]').classList.add("active");
    }
});

function displayMovies(movies) {
    if (movies.length === 0) {
        movieContainer.innerHTML = `<p class="error">No movies match this filter 😢</p>`;
        return;
    }

    const moviesHTML = movies.map((movie) => {
        const posterSrc = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster";
        const isFav = window.favorites[movie.imdbID];
        const favClass = isFav ? "favorited" : "";
        const favIcon = isFav ? "❤️" : "🤍";

        return `
            <div class="movie-card">
                <button class="fav-btn ${favClass}" onclick="window.toggleFavorite(event, '${movie.imdbID}')" aria-label="Favorite">
                    ${favIcon}
                </button>
                <img src="${posterSrc}" alt="${movie.Title} Poster" loading="lazy">
                <div class="movie-info">
                    <h3>${movie.Title}</h3>
                    <p>${movie.Year}</p>
                    <button onclick="window.getMovieDetails('${movie.imdbID}')">View Details</button>
                </div>
            </div>
        `;
    }).join('');

    movieContainer.innerHTML = moviesHTML;
}

window.toggleFavorite = function (event, id) {
    event.stopPropagation();
    const btn = event.currentTarget;

    if (window.favorites[id]) {
        delete window.favorites[id];
        btn.classList.remove("favorited");
        btn.textContent = "🤍";

        const activeLink = document.querySelector('.sidebar-link.active');
        if (activeLink && activeLink.getAttribute('data-category') === "Liked") {
            window.showLikedMovies();
        }
    } else {
        const movieObj = window.currentMovies.find(movie => movie.imdbID === id);
        if (movieObj) {
            window.favorites[id] = movieObj;
            btn.classList.add("favorited");
            btn.textContent = "❤️";
        }
    }
};

window.getMovieDetails = async function (id) {
    document.body.style.cursor = 'wait';
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`);
        const movie = await response.json();
        document.body.style.cursor = 'default';
        if (movie.Response === "True") {
            showPopup(movie);
        } else {
            alert("Error loading movie details");
        }
    } catch (error) {
        document.body.style.cursor = 'default';
        console.error(error);
        alert("Error loading movie details");
    }
}

function showPopup(movie) {
    const posterSrc = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster";
    modalOverlay.innerHTML = `
        <div class="modal-content">
            <button class="close-btn" onclick="window.closeModal()">&times;</button>
            <img class="modal-poster" src="${posterSrc}" alt="${movie.Title}">
            <div class="modal-details">
                <h2>${movie.Title}</h2>
                <div class="modal-meta">
                    <span class="imdb-rating">⭐ ${movie.imdbRating} / 10</span>
                    <span>${movie.Year}</span>
                    <span>${movie.Runtime}</span>
                    <span>${movie.Rated}</span>
                </div>
                <p class="modal-plot">${movie.Plot}</p>
                <div class="modal-info-grid">
                    <strong>Genre</strong> <span>${movie.Genre}</span>
                    <strong>Director</strong> <span>${movie.Director}</span>
                    <strong>Actors</strong> <span>${movie.Actors}</span>
                    <strong>Language</strong> <span>${movie.Language}</span>
                </div>
            </div>
        </div>
    `;
    modalOverlay.classList.add("active");
}

