import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchDetails } from "../../redux/recipes/details";
import Loading from "../loading";
import "../styles/modal.css";

const Recipe = () => {
  const { id } = useParams();
  const [dispValue, setDispValue] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchDetails(id));
  }, [id, dispatch]);

  const { loading, details } = useSelector((state) => state.details);
  const [recipeName, setRecipeName] = useState("");
  const [recipeImage, setRecipeImage] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("");
  const [recipeCuisine, setRecipeCuisine] = useState("");
  const [recipeDietary, setRecipeDietary] = useState("");
  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredientsList, setIngredientsList] = useState([]);

  useEffect(() => {
    if (details) {
      setRecipeName(details.name || "");
      setRecipeImage(details.image || "");
      setRecipeDescription(details.description || "");
      setRecipeCuisine(details.cuisine || "");
      setRecipeDietary(details.dietary || "");
    }
  }, [details]);

  const changeDisp = () => {
    setDispValue(!dispValue);
  };

  const handleAddIngredient = (ingredient) => {
    setIngredientsList([...ingredientsList, ingredient]);
  };

  const handleRemoveIngredient = (index) => {
    setIngredientsList(ingredientsList.filter((_, i) => i !== index));
  };

  const updateRecipe = () => {
    const ingsToAdd = [];
    ingredientsList.forEach((ingredient) => {
      ingsToAdd.push(ingredient.id);
    });
    if (details.ingredients) {
      details.ingredients.forEach((ingredient) => {
        ingsToAdd.push(ingredient.id);
      });
    }

    const data = {
      name: recipeName,
      image: recipeImage,
      description: recipeDescription,
      cuisine: recipeCuisine,
      dietary: recipeDietary,
      ingredient_ids: ingsToAdd,
    };

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    return requestOptions;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalLoading(true);
    fetch(`http://127.0.0.1:8000/recipes/${details.id}`, updateRecipe())
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(fetchDetails(id));
        setLocalLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLocalLoading(false);
      });

    setModalOpen(false);
  };

  const deleteIngredient = (index) => {
    const pars = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    setLocalLoading(true);
    fetch(
      `http://127.0.0.1:8000/recipes/${details.id}/ingredients/${index}/`,
      pars
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(fetchDetails(id));
        setLocalLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLocalLoading(false);
      });
  };

  const deleteRecipe = () => {
    const pars = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    setLocalLoading(true);
    fetch(`http://127.0.0.1:8000/recipes/${details.id}/`, pars)
      .then((response) => response.json())
      .then((response) => {
        if (response.ok) {
          navigate("/recipes");
        } else {
          throw new Error("Failed to delete the recipe");
        }
      })
      .catch((error) => {
        console.error(error);
        setLocalLoading(false);
      });
  };

  useEffect(() => {
    if (modalOpen) {
      setLocalLoading(true);
      fetch(`http://127.0.0.1:8000/available_ingredients/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setAvailableIngredients(data);
          setLocalLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch available ingredients", error);
          setLocalLoading(false);
        });
    }
  }, [modalOpen, id]);

  const filteredIngredients = availableIngredients.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(ingredientInput.toLowerCase())
  );

  if (loading || localLoading || !details) {
    return <Loading />;
  }

  return (
    <section id="Recipe">
      <header>
        <h1>Recipe Details</h1>
        <p>View and manage recipe details.</p>
      </header>

      <main>
        <div className="recipeContainer">
          <div className="detailsHeader">
            <h2>{details.name}</h2>
            <div className="detailsButtons">
              <button onClick={() => setModalOpen(true)}>Edit</button>
              <button onClick={deleteRecipe}>Delete</button>
            </div>
          </div>
          <img src={details.image} alt={details.name} />
          <h4>Description</h4>
          <p>{details.description}</p>
          <h4>Cuisine</h4>
          <p>{details.cuisine}</p>
          <h4>Dietary</h4>
          <p>{details.dietary}</p>
          <div className="detailsIngs">
            <h4>Ingredients</h4>
            <div className="editIngButtons">
              <button onClick={changeDisp}>Remove</button>
            </div>
          </div>
          <ul>
            {details.ingredients &&
              details.ingredients.map((ingredient) => (
                <li key={ingredient.id}>
                  <p>{ingredient.name}</p>
                  <button
                    style={{ display: dispValue ? "block" : "none" }}
                    onClick={() => deleteIngredient(ingredient.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
          </ul>
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
            <h2>Submit Your Recipe</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="recipeName">Recipe Name</label>
              <input
                type="text"
                id="recipeName"
                name="recipeName"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
                required
              />

            <label htmlFor="recipeImage">Recipe Image</label>
              <input
                type="text"
                id="recipeImage"
                name="recipeImage"
                value={recipeImage}
                onChange={(e) => setRecipeImage(e.target.value)}
                required
              />

              <label htmlFor="recipeDescription">Description</label>
              <textarea
                id="recipeDescription"
                name="recipeDescription"
                value={recipeDescription}
                onChange={(e) => setRecipeDescription(e.target.value)}
                required
              ></textarea>

              <label htmlFor="recipeCuisine">Cuisine</label>
              <textarea
                id="recipeCuisine"
                name="recipeCuisine"
                value={recipeCuisine}
                onChange={(e) => setRecipeCuisine(e.target.value)}
                required
              ></textarea>

              <label htmlFor="recipeDietary">Dietary</label>
              <textarea
                id="recipeDietary"
                name="recipeDietary"
                value={recipeDietary}
                onChange={(e) => setRecipeDietary(e.target.value)}
                required
              ></textarea>

              <label htmlFor="ingredients">Ingredients</label>
              <input
                type="text"
                id="ingredientInput"
                name="ingredientInput"
                value={ingredientInput}
                onChange={(e) => setIngredientInput(e.target.value)}
                placeholder="Search ingredients"
              />
              <div className="ingredient-list">
                {filteredIngredients.map((ingredient) => (
                  <button
                    type="button"
                    key={ingredient.id}
                    onClick={() => handleAddIngredient(ingredient)}
                  >
                    {ingredient.name}
                  </button>
                ))}
              </div>
              <ul>
                {ingredientsList.map((ingredient, index) => (
                  <li key={index}>
                    <p>{ingredient.name}</p>
                    <button
                      type="button"
                      onClick={() => handleRemoveIngredient(index)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>

              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Recipe;
