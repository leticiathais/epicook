const app = {};

$(".option").on('click',function() {
  const $this = $(this)
  $(".option").css("opacity", "0.5");
  $this.css("opacity", "1");
});

    let existIngredient = false;
    
    app_id = `9c79ecbe`,
    app.key = `8ec80810875fa2db5bdd5498c5e1292b`,

    app.getRecipes = (searchTerm) => {
      $.ajax({
          url: `https://api.edamam.com/search`,
          method: `GET`,
          dataType: `jsonp`,
          data: {
              app_id: app_id,
              app_key: app.key,
              q: searchTerm
          }
      }).then(result => {
          const ingredientUserType = $("input[type='text']").val().toLowerCase();
          // Filter ingredients to match the ingredient from user input.
          result.hits.forEach(element => {
            ingredients = element.recipe.ingredients;
            ingredients.forEach(ingred => {
                if (ingred.text.includes(ingredientUserType)){
                  existIngredient = true;
                }
            });

            if (existIngredient === true) {
              const htmlToAppendTrue = `
              <div class="recipe-box">
                <a href="${element.recipe.url}"> 
                  <h2 class="recipe-title">${element.recipe.label}</h2>
                    <img class="recipe-image" src=${element.recipe.image}> 
                  <h3 class="recipe-calories"> ${parseInt(element.recipe.calories)} kcal </h3>
                </a>
              </div>
              `;
            $('.recipes').append(htmlToAppendTrue);
            }
            existIngredient = false;
        });

        if ($('.recipes').is(':empty')) {
            const htmlToAppendFalse = `
            <div class="alert-box">
                <form>
                  <h2 class="not-found-title"> Oooops! </h2>
                  <h3 class="not-found-message"> We couldn't find your recipe, <br> try again with another ingredient. </h3>
                  <input type="submit" value="Try Again!">
                <form> 
            </div>
            `;
        $('.recipes').append(htmlToAppendFalse);
        }
        
      });
    };

    app.getUserSelection = () => {
      $('form').on('submit', function(e){
        e.preventDefault();

        const dietUserSelect = $(".option[style='opacity: 1;']").text()
        
        if (dietUserSelect === "") {
          const htmlToAppendError = `
            <div> 
            ❗️Please choose a diet.
            </div>
          `;
          $('.error-message').append(htmlToAppendError);

        } else {
          app.getRecipes(dietUserSelect);

          $('.error-message').empty()
          $('.recipes').empty();
          $(window).scrollTop($(".epicook-container").offset().top);
        }

        
      });
    };

    app.init = () => {
      app.getUserSelection();
    };

    // Document Ready/Init
    $(function(){
      app.init();
    });
