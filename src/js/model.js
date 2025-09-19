import { API_URL } from './config';
import { fetchRecipe } from './helpers'

export const state = {
  recipe: {},
};
export async function laodRecipes(id) {
  try {
    const data=await fetchRecipe(`${API_URL}/${id}`)
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    throw err;
    //cause we want to catch this error in controlller 
  }
}
