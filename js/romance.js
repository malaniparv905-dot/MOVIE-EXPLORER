// js/romance.js
(function() {
    const romanceKeywords = ["love", "romance", "romantic", "wedding", "heart", "kiss", "bride"];
    
    document.addEventListener("DOMContentLoaded", () => {
        const romanceLink = document.querySelector('.filter-btn[data-category="Romance"]');
        if (romanceLink) {
            romanceLink.addEventListener("click", () => {
                if (window.applyGenreTheme) window.applyGenreTheme("theme-romance"); 
                if (window.fetchDynamicGenre) window.fetchDynamicGenre(romanceKeywords);
            });
        }
    });
})();
