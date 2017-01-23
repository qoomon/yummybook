jQuery(document).ready(function($) {

  var cookbook = window.cookbook;

  var selectedTags = new Set();

  var tags = new Set();
  cookbook.recipes.forEach(function (recipe) {
      recipe.tags.forEach(function (tag) {
          if (!tags.has(tag)) {
              var searchTagElement = $('<div class="search-tag paper-style hover-zoom">' + tag + '</div>');
              searchTagElement.click(function () {
                  if (selectedTags.delete(tag)) {
                      $(this).removeClass("search-tag-selected ");
                  } else {
                      selectedTags.add(tag);
                      $(this).addClass("search-tag-selected ");
                  }
                  recipesGridTagFilter(selectedTags);
              });
              $('.search-tags').append(searchTagElement);
          }
          tags.add(tag);
      });
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
    // getSortData: {
    //   recipe-name: '.recipe-name',
    //   symbol: '.symbol',
    //   number: '.number parseInt',
    //   category: '[data-category]',
    //   weight: function( itemElem ) {
    //     var weight = $( itemElem ).find('.weight').text();
    //     return parseFloat( weight.replace( /[\(\)]/g, '') );
    //   }
    // }
  };

  // init Isotope
  var $recipesGrid = $('.recipes').isotope(recipesGridOptions);

  function recipesGridTagFilter(tags) {
    var $items = $recipesGrid.find(recipesGridOptions.itemSelector);
    $items.toggleClass("hover-zoom", false);
    $recipesGrid.one( 'arrangeComplete', function() {
      setTimeout(function(){
        $items.toggleClass("hover-zoom", true)
      });
    });
    
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
  

  // // bind sort button click
  // $('#sorts').on( 'click', 'button', function() {
  //   var sortByValue = $(this).attr('data-sort-by');
  //   $grid.isotope({ sortBy: sortByValue });
  // });

});


  