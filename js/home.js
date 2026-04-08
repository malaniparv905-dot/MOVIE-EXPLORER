// js/home.js
(function() {
    const homeKeywords = ["man", "world", "day", "night", "city", "star", "love", "life", "time", "boy"];
    
    document.addEventListener("DOMContentLoaded", () => {
        const homeLinks = document.querySelectorAll('[data-category="Home"]');
        homeLinks.forEach(homeLink => {
            homeLink.addEventListener("click", () => {
                if (window.applyGenreTheme) window.applyGenreTheme(""); 
                if (window.fetchDynamicGenre) window.fetchDynamicGenre(homeKeywords);
            });
        });

        const likedLink = document.querySelector('.sidebar-link[data-category="Liked"]');
        if (likedLink) {
            likedLink.addEventListener("click", () => {
                if (window.applyGenreTheme) window.applyGenreTheme(""); 
                if (window.showLikedMovies) window.showLikedMovies();
            });
        }

        // Trigger default home
        if (homeLinks.length > 0) {
            homeLinks[0].classList.add("active");
            if (window.applyGenreTheme) window.applyGenreTheme("");
            if (window.fetchDynamicGenre) window.fetchDynamicGenre(homeKeywords);
        }
    });
})();

