const PAT = "e830d45b1e274301ac15300c7524e50f";
const USER_ID = "clarifai";
const APP_ID = "main";
const MODEL_ID = "food-item-recognition";
const MODEL_VERSION_ID = "1d5fd481e0cf4826aa72ec3ff049e044";

document.getElementById("recipeForm").addEventListener("submit", function (event) {
  event.preventDefault();

  let formData = new FormData(event.target);
  let recipeName = formData.get("recipeName");
  let diet = formData.get("diet");
  let health = formData.get("health");
  let cuisineType = formData.get("cuisineType");
  let mealType = formData.get("mealType");
  let dishType = formData.get("dishType");
  let imageSize = formData.get("imageSize");

  // Build the API URL with parameters
  let apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(
    recipeName
  )}&app_id=89889bb0&app_key=84f5da4bd124ac5edcb874aaf4473fe1&diet=${diet}&health=${health}&cuisineType=${cuisineType}&mealType=${mealType}&dishType=${dishType}&imageSize=SMALL`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.hits.length > 0) {
        let recipe = data.hits[0].recipe;
        let ingredients = recipe.ingredients.map((ingredient) => ingredient.text);

        // Display recipe details
        const recipeDetails = document.getElementById("recipeDetails");
        const nutrients = recipe.totalNutrients;
        recipeDetails.innerHTML = `
            <div class="recipe-details">
              <h3>${recipe.label}</h3>
              <h4>Ingredients:</h4>
              <ul>${ingredients.map((item) => `<li>${item}</li>`).join("")}</ul>
              <h4>Instructions:</h4>
              <a href="${recipe.url}" target="_blank">View full recipe</a>
              <h4>Calories: ${Math.round(recipe.calories)}</h4>
              <h4>Nutrients:</h4>
              <div class="nutrient-list">
                  <span class="nutrient-item"><strong>Calcium:</strong> ${
                    nutrients.CA ? Math.round(nutrients.CA.quantity) + " " + nutrients.CA.unit : "N/A"
                  }</span>
                  <span class="nutrient-item"><strong>Magnesium:</strong> ${
                    nutrients.MG ? Math.round(nutrients.MG.quantity) + " " + nutrients.MG.unit : "N/A"
                  }</span>
                  <span class="nutrient-item"><strong>Sodium:</strong> ${
                    nutrients.NA ? Math.round(nutrients.NA.quantity) + " " + nutrients.NA.unit : "N/A"
                  }</span>
                  <span class="nutrient-item"><strong>Vitamin D:</strong> ${
                    nutrients.VITD ? Math.round(nutrients.VITD.quantity) + " " + nutrients.VITD.unit : "N/A"
                  }</span>
              </div>
              <img src="${recipe.image}" alt="${recipe.label}" style="width: ${imageSize}px;" />
            </div>
        `;
        document.getElementById("recipeContainer").style.display = "block";
      } else {
        alert("No recipes found for the provided name and parameters.");
      }
    })
    .catch((error) => {
      console.error("Error fetching recipe data:", error);
      alert("An error occurred while fetching recipe data.");
    });
});
