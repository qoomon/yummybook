jQuery(document).ready(function($) {

  var cookbook = window.cookbook;

  var tags = new Set();
  cookbook.recipes.forEach(function (recipe) {
      recipe.tags.forEach(function (tag) {
          tags.add(tag);
      });
  });

  var selectedTags = new Set();
  Array.from(tags).sort().forEach(function(tag){
    var searchTagElement = $('<div class="search-tag paper-style hover-zoom">' + tag + '</div>');
    searchTagElement.click(function () {
        if (selectedTags.delete(tag)) {
            $(this).removeClass("search-tag-selected");
        } else {
            selectedTags.add(tag);
            $(this).addClass("search-tag-selected");
        }
        recipesGridTagFilter(selectedTags);
    });
    $('.search-tags').append(searchTagElement);
  });

  cookbook.recipes.forEach(function (recipe, index) {
      var recipeCardTemplate = Handlebars.compile($('#recipe-card-template').html());
      var recipeCardHtml = $(recipeCardTemplate(recipe));
      recipeCardHtml.attr("recipe-index", index);
      $('.recipes').append(recipeCardHtml);
      recipe.domElement = recipeCardHtml;
  });

  var recipesGridOptions = {
    itemSelector: '.recipe-card',
    layoutMode: 'masonry',
    masonry: {
      isFitWidth: true
    }
  };

  // init Isotope
  var $recipesGrid = $('.recipes').isotope(recipesGridOptions);

  function recipesGridTagFilter(tags) {
    $recipesGrid.isotope({ filter: function(){
      var recipeIndex = parseInt($(this).attr('recipe-index'));
      var matchingTags = cookbook.recipes[recipeIndex].tags.filter(function (tag) {
          return tags.has(tag);
      });
      console.log(tags.size);
      console.log(matchingTags.length);
      return tags.size == matchingTags.length;
    }});
  }

});
