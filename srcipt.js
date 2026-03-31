const API_KEY = "1f5fa721";

const searchBtn = document.getElementById("searchBtn");
const movieInput = document.getElementById("movieInput");
const movieContainer = document.getElementById("movies");
const loader = document.getElementById("loader");

searchBtn.addEventListener("click", () => {
    const movieName = movieInput.value.trim();

    if (movieName === "") {
        alert("Please enter movie name");
        return;
    }

    fetchMovies(movieName);
});


async function fetchMovies(movieName) {

    loader.style.display = "block";
    movieContainer.innerHTML = "";

    try {

        const response = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${movieName}`
        );

        const data = await response.json();

        loader.style.display = "none";

        if (data.Response === "True") {
            displayMovies(data.Search);
        }
        else {
            movieContainer.innerHTML =
                `<p class="error">No movies found 😢</p>`;
        }

    }
    catch (error) {

        loader.style.display = "none";

        movieContainer.innerHTML =
            `<p class="error">Error fetching data ⚠️</p>`;

        console.log(error);
    }

}



function displayMovies(movies) {

    movieContainer.innerHTML = "";

    movies.forEach(movie => {

        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        movieCard.innerHTML = `

            <img src="${movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/300x450?text=No+Image"}">

            <h3>${movie.Title}</h3>

            <p>Year: ${movie.Year}</p>

            <button onclick="getMovieDetails('${movie.imdbID}')">
                View Details
            </button>
        `;

        movieContainer.appendChild(movieCard);

    });

}



async function getMovieDetails(id) {

    loader.style.display = "block";

    try {

        const response = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
        );

        const movie = await response.json();

        loader.style.display = "none";

        showPopup(movie);

    }
    catch (error) {

        loader.style.display = "none";

        alert("Error loading movie details");

    }

}



function showPopup(movie) {

    const popup = document.createElement("div");

    popup.classList.add("popup");

    popup.innerHTML = `

        <div class="popup-content">

            <span class="close" onclick="this.parentElement.parentElement.remove()">❌</span>

            <img src="${movie.Poster}">

            <h2>${movie.Title}</h2>

            <p><b>Year:</b> ${movie.Year}</p>

            <p><b>Genre:</b> ${movie.Genre}</p>

            <p><b>IMDB Rating:</b> ${movie.imdbRating}</p>

            <p>${movie.Plot}</p>

        </div>

    `;

    document.body.appendChild(popup);

}
