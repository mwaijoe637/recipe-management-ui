import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const RecipeItem = (props) => {
  const { recipe } = props;

  return (
    <li className="singleRecipe"
    style={{ 
      backgroundImage: `url(${recipe.image})`
    }}
    >
      <Link to={`/recipe/${recipe.id}`} className="nav-link">
        <h3>{recipe.name}</h3>
      </Link>
    </li>
  );
};

RecipeItem.propTypes = {
  recipe: PropTypes.instanceOf(Object).isRequired,
};

export default RecipeItem;
