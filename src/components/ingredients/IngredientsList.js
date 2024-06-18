import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import IngredientItem from "./IngredientItem";
import Loading from "../loading";
import { fetchIngredients } from "../../redux/ingredients/ingredients";

const IngredientsList = () => {
  const { loading, ingredients } = useSelector((state) => state.ingredients);
  const [localLoading, setLocalLoading] = useState(false);
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientImage, setIngredientImage] = useState("");
  const [ingredientID, setIngredientID] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalLoading(true);
    const data = {
      name: ingredientName,
      image: ingredientImage,
    };

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch(`http://127.0.0.1:8000/ingredients/${ingredientID}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(fetchIngredients());
        setLocalLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLocalLoading(false);
      });

    setModalOpen(false);
  };

  const deleteIngredient = (id) => {
    const pars = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    setLocalLoading(true);
    fetch(`http://127.0.0.1:8000/ingredients/${id}/`, pars)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(fetchIngredients());
        setLocalLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLocalLoading(false);
      });
  };

  if (ingredients === null || ingredients === undefined) {
    return <Loading />;
  }

  if (loading || localLoading) {
    return <Loading />;
  }

  return (
    <section id="Homepage">
      <header>
        <h1>Ingredients</h1>
        <p>View and manage ingredients.</p>
      </header>

      <main>
        <div className="ingredientsContainer">
          {ingredients === null || ingredients === undefined ? (
            <p>No Ingredients Found!</p>
          ) : (
            <ul className="ingredients">
              {ingredients.map((ingredient) => (
                <IngredientItem
                  key={ingredient.id}
                  ingredient={ingredient}
                  deleteIngredient={deleteIngredient}
                  setIngredientID={setIngredientID}
                />
              ))}
            </ul>
          )}
        </div>
      </main>

      <footer>
        <p>&copy; 2024 Recipe Manager. All rights reserved.</p>
      </footer>
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModalOpen(false)}>
              &times;
            </span>
            <h2>Submit Your Ingredient</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="ingredientName">Ingredient Name</label>
              <input
                type="text"
                id="ingredientName"
                name="ingredientName"
                value={ingredientName}
                onChange={(e) => setIngredientName(e.target.value)}
              />

              <label htmlFor="ingredientImage">Ingredient Image</label>
              <input
                type="text"
                id="ingredientImage"
                name="ingredientImage"
                value={ingredientImage}
                onChange={(e) => setIngredientImage(e.target.value)}
              />

              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default IngredientsList;
