import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import logger from "redux-logger";
import ingredientsReducer from "./ingredients/ingredients";
import recipesReducer from "./recipes/recipes";
import detailsReducer from "./recipes/details";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer.reducer,
  recipes: recipesReducer.reducer,
  details: detailsReducer.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});

export default store;
