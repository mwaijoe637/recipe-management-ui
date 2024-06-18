import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const INGREDIENTS_API = "http://127.0.0.1:8000/ingredients/";

const getIngredientsFromAPI = async () => {
  const response = await fetch(INGREDIENTS_API);
  const data = await response.json();
  return data;
};

const GET_INGREDIENTS = "recipe-manager/ingredients/GET_INGREDIENTS";
const initialState = {
  loading: false,
  ingredients: [],
};

const fetchIngredients = createAsyncThunk(GET_INGREDIENTS, async () => {
  const response = await getIngredientsFromAPI();
  return response;
});

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.fulfilled, (state, action) => ({
      loading: false,
      ingredients: action.payload,
    }));

    builder.addCase(fetchIngredients.pending, (state, action) => ({
      loading: true,
      ingredients: action.payload,
    }));
  },
});

export default ingredientsSlice;
export { fetchIngredients };
