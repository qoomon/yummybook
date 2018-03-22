var cookbook = window.cookbook;

var recipeName = document.location.hash.split('#')[1];

var recipe = cookbook.recipes.filter(function (recipe) {
    return recipe.name == decodeURIComponent(recipeName);
})[0];

Handlebars.registerHelper('inc', function (value) {
    return value + 1;
});
var recipeCardTemplate = Handlebars.compile($('#recipe-template').html());
var recipeCardHtml = recipeCardTemplate(recipe);
$('.recipe').append(recipeCardHtml);

