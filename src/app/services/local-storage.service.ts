import { Injectable } from '@angular/core';
import { Pokemon } from '../components/listagem/models/Pokemon';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  readonly storage = "pokedex:storage"
  constructor() { }

  public SerealizarFavoritos(pokemonsFavoritos: Pokemon[]) {
    const jsonString = JSON.stringify(pokemonsFavoritos);


    localStorage.setItem(this.storage, jsonString);
  }

  public DesserealizarFavoritos(): Pokemon[] {
    const jsonString = localStorage.getItem(this.storage);

    if (!jsonString) return []

    const pokemons = JSON.parse(jsonString) as Pokemon[];

    return pokemons;
  }
}
