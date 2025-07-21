import { pokemonType } from "../../listagem/models/pokemon-types";

export interface detalhesPokemon{
  id:number;
  name:string;
  sprites:string[];
  types:pokemonType[];
  height:number;
  weight:number;
}
