import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCollections } from "../../firebaseAction/firebaseAction";
import { ICollection, } from "../../types/typescript";
// thunk
export const getCollectionsImage = createAsyncThunk(
  "collection/fetch",
  async (payload: { email: string}) => {
    const { email } = payload;
    const result = await getCollections(email) as ICollection[];
    return { result }
  }
);

export interface CollectionState {
  collection: ICollection[],
  loading:boolean
}

const initialState: CollectionState = {
  collection: [],
  loading:false
};

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    setCollection: (state, action) => {
      state.collection.unshift(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCollectionsImage.pending, (state) => {
        state.loading = true
      })
      .addCase(getCollectionsImage.fulfilled, (state, action) => {
        state.collection = action.payload.result
        state.loading = false
      })
  },
});

export const { setCollection } = collectionSlice.actions;

export default collectionSlice.reducer;
