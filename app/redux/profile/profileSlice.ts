import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { changeProfile, getProfile } from "../../firebaseAction/firebaseAction";
import { IAuth, IProfile } from "../../types/typescript";

// thunk
export const profileUpdate = createAsyncThunk(
  "profile/update",
  async (params: { user: IAuth; data: IProfile }) => {
    const { user, data } = params;
    return await changeProfile(user, data);
  }
);
// thunk
export const fetchProfile = createAsyncThunk(
  "profile/fetch",
  async (email: string) => {
    return await getProfile(email);
  }
);

export interface ProfileState {
  profile?: IProfile;
}

const initialState: ProfileState = {
  profile: undefined,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      ({ type }) => type.startsWith("profile") && type.endsWith("/fulfilled"),
      (state, action: PayloadAction<IProfile | undefined>) => {
        state.profile = action.payload;
      }
    );
  },
});


export default profileSlice.reducer;
