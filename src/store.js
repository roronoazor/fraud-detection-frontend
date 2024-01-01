import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./modules/auth/redux/authSlice";
import storage from "redux-persist/lib/storage";
import { combineReducers, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";

const reducers = combineReducers({
  auth: authReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
  let store = createStore(persistedReducer);
  let persistor = persistStore(store);
  return { store, persistor };
};
