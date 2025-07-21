import { ToTitleCase } from "./convert-to-tittle-case";
import { pokemonType } from "../components/listagem/models/pokemon-types";

export function MapearTipoPokemon(obj: any): pokemonType {
  return { name: ToTitleCase(obj.type.name) }
}
