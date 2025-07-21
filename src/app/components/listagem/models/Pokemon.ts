import { pokemonType } from "./pokemon-types";

export interface Pokemon {
  id: number;
  name: string;
  types: pokemonType[];
  sprites: string;
  isFavorito: boolean;
}
