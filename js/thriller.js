// js/thriller.js
(function() {
    const thrillerKeywords = ["blood", "mystery", "murder", "kill", "secret", "dark", "crime", "spy"];
    
    document.addEventListener("DOMContentLoaded", () => {
        const thrillerLink = document.querySelector('.filter-btn[data-category="Thriller"]');
        if (thrillerLink) {
            thrillerLink.addEventListener("click", () => {
                if (window.applyGenreTheme) window.applyGenreTheme("theme-thriller"); 
                if (window.fetchDynamicGenre) window.fetchDynamicGenre(thrillerKeywords);
            });
        }
    });
})();
