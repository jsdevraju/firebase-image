import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import auth from "../redux/auth/authSlice";
import profile from "../redux/profile/profileSlice";
import collection from "../redux/collection/collectionSlice";

const store = configureStore({
  reducer: {
    auth,
    profile,
    collection
  },
  middleware:(getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck:false
  }),
  devTools: process.env.NODE_ENV !== "production",
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
// Custom Hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
// Custom Hooks
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
