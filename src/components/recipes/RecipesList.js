import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import RecipeItem from "./RecipeItem";
import Loading from "../loading";
import { fetchRecipes } from "../../redux/recipes/recipes";

const RecipesList = () => {
  const { loading, recipes } = useSelector((state) => state.recipes);
  const [searchInput, setSearchInput] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  useEffect(() => {
    if (recipes) {
      setFilteredRecipes(recipes);
    }
  }, [recipes]);

  useEffect(() => {
    if (searchInput && recipes) {
      const lowerCaseSearch = searchInput.toLowerCase();
      const filtered = recipes.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(lowerCaseSearch) ||
          recipe.description.toLowerCase().includes(lowerCaseSearch) ||
          recipe.cuisine.toLowerCase().includes(lowerCaseSearch) ||
          recipe.dietary.toLowerCase().includes(lowerCaseSearch)
      );
      setFilteredRecipes(filtered);
    } else {
      setFilteredRecipes(recipes);
    }
  }, [searchInput, recipes]);

  if (loading || !recipes) {
    return <Loading />;
  }

  return (
    <section id="Recipes">
      <header>
        <h1>Recipes</h1>
        <p>View and manage recipes.</p>
      </header>

      <main>
        <div className="searchContainer">
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className="recipesContainer">
          <ul className="recipes">
            {filteredRecipes === undefined || filteredRecipes.length === 0 ? (
              <p>No recipes found.</p>
            ) : (
              filteredRecipes.map((recipe) => (
                <RecipeItem key={recipe.id} recipe={recipe} />
              ))
            )}
          </ul>
        </div>
      </main>

      <footer>
        <p>&copy; 2024 Recipe Manager. All rights reserved.</p>
      </footer>
    </section>
  );
};

export default RecipesList;
