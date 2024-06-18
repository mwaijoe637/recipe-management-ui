import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRecipes } from "../redux/recipes/recipes";
import { fetchIngredients } from "../redux/ingredients/ingredients";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import OwlCarousel from "react-owl-carousel";
import "./styles/homeShow.css";
import Loading from "./loading";

const Homepage = () => {
  const { loading, ingredients } = useSelector((state) => state.ingredients);

  const { recipes } = useSelector((state) => state.recipes);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchRecipes());
  }, [dispatch]);

  if (!ingredients || !recipes) {
    return <Loading />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <section id="Homepage">
      <header>
        <h1>Welcome to Recipe Manager</h1>
        <p>Manage your recipes and ingredients easily with our application.</p>
      </header>

      <main>
        <div className="link-container">
          <div className="ingredientsShow">
            <div className="ingredientsShowHeading">
              <h3>Ingredients</h3>
              <Link to={`/ingredients`} className="link-item">
                <h5>View All</h5>
              </Link>
            </div>
            <div className="ingredientsShowBody">
              <OwlCarousel className="owl-theme" loop margin={10} nav>
                {ingredients.map((ingredient, index) => (
                  <div className="item" key={index}>
                    <div
                      className="ingredientImage"
                      style={{ backgroundImage: `url(${ingredient.image})` }}
                    >
                      <p>{ingredient.name}</p>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            </div>
          </div>
          <div className="recipesShow">
            <div className="recipesShowHeading">
              <h3>Ingredients</h3>
              <Link to={`/recipes`} className="link-item">
                <h5>View All</h5>
              </Link>
            </div>
            <div className="recipesShowBody">
              <OwlCarousel className="owl-theme" loop margin={10} nav>
                {recipes.map((recipe, index) => (
                  <div className="item" key={index}>
                    <div
                      className="recipeImage"
                      style={{ backgroundImage: `url(${recipe.image})` }}
                    >
                      <p>{recipe.name}</p>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <p>&copy; 2024 Recipe Manager. All rights reserved.</p>
      </footer>
    </section>
  );
};

export default Homepage;
