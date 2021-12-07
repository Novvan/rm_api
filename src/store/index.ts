import { configureStore } from "@reduxjs/toolkit";
import CharacterListReducer from "./features/CharacterList/CharacterListSlice";
import SelectedCharacterSlice from "./features/SelectedCharacter/SelectedCharacterSlice";

const store = configureStore({
  reducer: {
    CharacterList: CharacterListReducer,
    SelectedCharacter: SelectedCharacterSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
