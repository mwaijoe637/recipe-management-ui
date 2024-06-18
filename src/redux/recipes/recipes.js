import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const RECIPES_API = "http://127.0.0.1:8000/recipes/";

const getRecipesFromAPI = async () => {
  const response = await fetch(RECIPES_API);
  const data = await response.json();
  return data;
};

const GET_RECIPES = "recipe-manager/recipes/GET_RECIPES";
const initialState = {
  loading: false,
  recipes: [],
};

const fetchRecipes = createAsyncThunk(GET_RECIPES, async () => {
  const response = await getRecipesFromAPI();
  return response;
});

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRecipes.fulfilled, (state, action) => ({
      loading: false,
      recipes: action.payload,
    }));

    builder.addCase(fetchRecipes.pending, (state, action) => ({
      loading: true,
      recipes: action.payload,
    }));
  },
});

export default recipesSlice;
export { fetchRecipes };
