const app = {};
    
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
            console.log(result);
          const ingredientUserType = $("input[type='text']").val();
          // Filter ingredients to match the ingredient from user input.
          result.hits.forEach(element => {
            ingredients = element.recipe.ingredients;
            ingredients.forEach(ingred => {
                if (ingred.text.includes(ingredientUserType)){
                  existIngredient = true;
                }
            });

            if (existIngredient === true) {
              const htmlToAppend = `
              <div class="recipe-box">
                <a href="${element.recipe.url}"> 
                  <h2 class="recipe-title">${element.recipe.label}</h2>
                    <img class="recipe-image" src=${element.recipe.image}> 
                  <h3 class="recipe-calories"> ${parseInt(element.recipe.calories)} kcal </h3>
                </a>
              </div>
              `;
            $('.recipes').append(htmlToAppend);

            }
            existIngredient = false;
        });
      });
    };

    app.getUserSelection = () => {
      $('form').on('submit', function(e){
        e.preventDefault();

        const dietUserSelect = $("input[type='radio']:checked").val();

        app.getRecipes(dietUserSelect);

        $('.recipes').empty();
        $(window).scrollTop($(".epicook-container").offset().top);
      });
    };

    app.init = () => {
      app.getUserSelection();
    };

    // Document Ready/Init
    $(function(){
      app.init();
    });
