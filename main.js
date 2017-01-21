var cookbook = window.cookbook;

var selectedTags = new Set();

var tags = new Set();
cookbook.recipes.forEach(function (recipe) {
    recipe.tags.forEach(function (tag) {
        if (!tags.has(tag)) {
            var searchTagElement = $('<div class="search-tag paper-style hover-highlight">' + tag + '</div>');
            searchTagElement.click(function () {
                if (selectedTags.delete(tag)) {
                    $(this).removeClass("search-tag-selected ");
                } else {
                    selectedTags.add(tag);
                    $(this).addClass("search-tag-selected ");
                }
                filterRecipes(tag);
            });
            $('.search-tags').append(searchTagElement);
        }
        tags.add(tag);
    });
});

cookbook.recipes.forEach(function (recipe) {
    var recipeCardTemplate = Handlebars.compile($('#recipe-card-template').html());
    var recipeCardHtml = $(recipeCardTemplate(recipe));
    $('.recipes').append(recipeCardHtml);
    recipe.domElement = recipeCardHtml;
});


function filterRecipes(tag) {
    cookbook.recipes.forEach(function (recipe) {
        if (selectedTags.size > 0) {
            var matchingTags = recipe.tags.filter(function (tag) {
                return selectedTags.has(tag);
            });

            recipe.domElement.toggle(matchingTags.length == selectedTags.size);
        } else {
            recipe.domElement.show();
        }
    });

}