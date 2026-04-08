// js/comedy.js
(function() {
    const comedyKeywords = ["comedy", "laugh", "funny", "school", "camp", "family", "vacation"];
    
    document.addEventListener("DOMContentLoaded", () => {
        const comedyLink = document.querySelector('.filter-btn[data-category="Comedy"]');
        if (comedyLink) {
            comedyLink.addEventListener("click", () => {
                if (window.applyGenreTheme) window.applyGenreTheme("theme-comedy"); 
                if (window.fetchDynamicGenre) window.fetchDynamicGenre(comedyKeywords);
            });
        }
    });
})();

