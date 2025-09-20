import { API_URL } from './config';
import { fetchRecipe } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    result: [],
  },
};
export async function laodRecipes(id) {
  try {
    const data = await fetchRecipe(`${API_URL}/${id}`);
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
export async function loadSearchResults(query) {
  try {
    const data = await fetchRecipe(`${API_URL}?search=${query}`);
    state.search.result = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    // console.log(state.search.result);
  } catch (err) {
    throw err;
  }
}
