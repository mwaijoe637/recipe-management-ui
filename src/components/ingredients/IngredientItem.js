import React from "react";
import PropTypes from "prop-types";

const IngredientItem = (props) => {
  const { ingredient, deleteIngredient, setIngredientID } = props;

  return (
    <li className="singleIngredient">
      <img src={ingredient.image} alt={ingredient.name} />
      <h3>{ingredient.name}</h3>
      <div className="singleIngredientBtns">
        <button
          onClick={() => setIngredientID(ingredient.id)}
          className="ingEdit"
        >
          Edit
        </button>
        <button
          onClick={() => deleteIngredient(ingredient.id)}
          className="ingDel"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

IngredientItem.propTypes = {
  ingredient: PropTypes.instanceOf(Object).isRequired,
};

export default IngredientItem;
