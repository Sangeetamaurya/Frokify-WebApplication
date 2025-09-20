import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

// const recipeContainer = document.querySelector('.recipe');

async function showRecipes() {
  try {
    const id = window.location.hash.slice(1); //get the url after 1234/ ex: http://localhost:1234/#664c8f193e7aa067e94e84c2
    console.log(id);
    if (!id) return;

    recipeView.renderSpinnner();
    await model.laodRecipes(id);

    recipeView.render(model.state.recipe);
  } catch (e) {
    recipeView.renderError();
  }
}
async function searchRecipes() {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResults(query);
    searchView.render(model.state.search.result);
  } catch (err) {
    console.log(err);
  }
}
function init() {
  recipeView.addHandlerRender(showRecipes);
  searchView.addHandlerSearch(searchRecipes);
}
init();
//hashchange: when ever url # changes http://localhost:1234/#664c8f193e7aa067e94e84c2 this  #664c8f193e7aa067e94e84c2
