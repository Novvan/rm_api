import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Convert } from "../../../models/RickMortyCharacters";
import { CharacterListState } from "./types";

const initialState: CharacterListState = {
  value: {
    info: {
      count: 0,
      pages: 0,
      next: "",
      prev: "",
    },
    results: [],
  },
};

const CharacterListSlice = createSlice({
  name: "CharacterList",
  initialState,
  reducers: {
    setCharacterList: (state, action: PayloadAction<any>) => {
      if (action.payload.error) {
        state.value = {
          info: {
            count: 0,
            pages: 0,
            next: "",
            prev: "",
          },
          results: [],
        };
        return;
      }

      var stringify = JSON.stringify(action.payload);
      var charListResponse = Convert.toRickAndMortyCharacters(stringify);
      state.value.results = charListResponse.results;
      state.value.info.count = charListResponse.info.count;
      state.value.info.pages = charListResponse.info.pages;
      if (charListResponse.info.next !== null)
        state.value.info.next = charListResponse.info.next;
      if (charListResponse.info.prev !== null)
        state.value.info.prev = charListResponse.info.prev;
    },
    clearCharacterList: (state) => {
      state.value = {
        info: {
          count: 0,
          pages: 0,
          next: "",
          prev: "",
        },
        results: [],
      };
    },
  },
});

export const { setCharacterList, clearCharacterList } =
  CharacterListSlice.actions;
export default CharacterListSlice.reducer;
