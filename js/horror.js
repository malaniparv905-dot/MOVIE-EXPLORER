// js/horror.js
(function() {
    const horrorKeywords = ["horror", "ghost", "dead", "blood", "dark", "nightmare", "house", "demon", "devil"];
    
    document.addEventListener("DOMContentLoaded", () => {
        const horrorLink = document.querySelector('.filter-btn[data-category="Horror"]');
        if (horrorLink) {
            horrorLink.addEventListener("click", () => {
                if (window.applyGenreTheme) window.applyGenreTheme("theme-horror"); 
                if (window.fetchDynamicGenre) window.fetchDynamicGenre(horrorKeywords);
            });
        }
    });
})();

