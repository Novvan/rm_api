import { Character } from "../../../models/RickMortyCharacters";

interface CharacterListState {
  value: {
    info: {
      count: number;
      pages: number;
      next: string;
      prev: string;
    };
    results: Character[];
  };
}
