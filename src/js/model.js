import { API_URL, RecipePerPage } from './config';
import { fetchRecipe } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    result: [],
    page: 1,
    resultPerPage: RecipePerPage,
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
  } catch (err) {
    throw err;
  }
}
export function getSearchResultsPage(page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultPerPage;
  const end = page * state.search.resultPerPage;
  return state.search.result.slice(start, end);
}
export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    // newQt = oldQt * newServings / oldServings // 2 * 8 / 4 = 4
    //if oldQT =2 and oldServing is 4 and new serving is 8 like double so the Qt 
    // should be double thats why 2*8/4=4 newQt will be 4 like double 
  });

  state.recipe.servings = newServings;
};
