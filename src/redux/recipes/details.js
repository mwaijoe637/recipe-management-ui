import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const GET_DETAILS = "recipe-manager/recipes/GET_DETAILS";
const initialState = {
  loading: false,
  details: {},
};

const fetchDetails = createAsyncThunk(GET_DETAILS, async (id) => {
  const DETAILS_API = "http://127.0.0.1:8000/recipes/";
  const response = await fetch(DETAILS_API + id);
  const data = await response.json();
  return data;
});

const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDetails.fulfilled, (state, action) => ({
      loading: false,
      details: { ...action.payload },
    }));

    builder.addCase(fetchDetails.pending, (state, action) => ({
      loading: true,
      details: { ...action.payload },
    }));
  },
});

export default detailsSlice;
export { fetchDetails };
