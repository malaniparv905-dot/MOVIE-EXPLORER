// js/action.js
(function() {
    const actionKeywords = ["war", "fight", "action", "gun", "blood", "revenge", "strike", "fury"];
    
    document.addEventListener("DOMContentLoaded", () => {
        const actionLink = document.querySelector('.filter-btn[data-category="Action"]');
        if (actionLink) {
            actionLink.addEventListener("click", () => {
                if (window.applyGenreTheme) window.applyGenreTheme("theme-action"); 
                if (window.fetchDynamicGenre) window.fetchDynamicGenre(actionKeywords);
            });
        }
    });
})();
