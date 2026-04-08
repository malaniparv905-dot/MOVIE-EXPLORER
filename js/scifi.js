// js/scifi.js
(function() {
    const scifiKeywords = ["alien", "space", "star", "planet", "future", "robot", "galaxy", "mars"];
    
    document.addEventListener("DOMContentLoaded", () => {
        const scifiLink = document.querySelector('.filter-btn[data-category="Sci-Fi"]');
        if (scifiLink) {
            scifiLink.addEventListener("click", () => {
                if (window.applyGenreTheme) window.applyGenreTheme("theme-scifi"); 
                if (window.fetchDynamicGenre) window.fetchDynamicGenre(scifiKeywords);
            });
        }
    });
})();
