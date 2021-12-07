import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Character } from "../../../models/RickMortyCharacters";
import { SelectedCharacterState } from "./types";

const initialState: SelectedCharacterState = {
  value: null,
};

const SelectedCharacterSlice = createSlice({
  name: "SelectCharacter",
  initialState,
  reducers: {
    setSelectedCharacter: (state, action: PayloadAction<Character>) => {
      if (action.payload as Character) {
        if (state.value && state.value.id === action.payload.id) {
          return state;
        }
        state.value = action.payload;
      }
    },
    clearSelectedCharacter: (state) => {
      state.value = null;
    },
  },
});

export const { clearSelectedCharacter, setSelectedCharacter } =
  SelectedCharacterSlice.actions;
export default SelectedCharacterSlice.reducer;
