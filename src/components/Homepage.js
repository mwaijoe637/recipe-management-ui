import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRecipes } from "../redux/recipes/recipes";
import { fetchIngredients } from "../redux/ingredients/ingredients";
import Slider from "react-slick";
import Loading from "./loading";
import ErrorBoundary from "./ErrorBoundary";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles/homeShow.css";

const Homepage = () => {
  const { loading, ingredients } = useSelector((state) => state.ingredients);
  const { recipes } = useSelector((state) => state.recipes);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Fetching ingredients and recipes");
    dispatch(fetchIngredients());
    dispatch(fetchRecipes());
  }, [dispatch]);

  useEffect(() => {
    console.log("Ingredients state updated", ingredients);
    console.log("Recipes state updated", recipes);
  }, [ingredients, recipes]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 2,
    slidesToShow: 7,
    slidesToScroll: 1,
  };

  if (!ingredients || !recipes) {
    console.log("Loading: Ingredients or Recipes not available");
    return <Loading />;
  }

  if (loading) {
    console.log("Loading: Still fetching data");
    return <Loading />;
  }

  return (
    <ErrorBoundary>
      <section id="Homepage">
        <header>
          <h1>Welcome to Recipe Manager</h1>
          <p>
            Manage your recipes and ingredients easily with our application.
          </p>
        </header>

        <main>
          <div className="link-container">
            <div className="ingredientsShow">
              <div className="ingredientsShowHeading">
                <h3>Ingredients</h3>
                <Link to="/ingredients" className="link-item">
                  <h5>View All</h5>
                </Link>
              </div>
              <div className="ingredientsShowBody">
                <Slider {...settings}>
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
                </Slider>
              </div>
            </div>
            <div className="ingredientsShow">
              <div className="ingredientsShowHeading">
                <h3>Recipes</h3>
                <Link to="/recipes" className="link-item">
                  <h5>View All</h5>
                </Link>
              </div>
              <div className="ingredientsShowBody">
                <Slider {...settings}>
                  {recipes.map((ingredient, index) => (
                    <div className="item" key={index}>
                      <div
                        className="ingredientImage"
                        style={{ backgroundImage: `url(${ingredient.image})` }}
                      >
                        <p>{ingredient.name}</p>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </main>

        <footer>
          <p>&copy; 2024 Recipe Manager. All rights reserved.</p>
        </footer>
      </section>
    </ErrorBoundary>
  );
};

export default Homepage;
