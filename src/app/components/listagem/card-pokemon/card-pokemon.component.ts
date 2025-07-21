import { Pokemon } from '../models/Pokemon';
import { RouterLink } from '@angular/router';
import { typeColor } from '../models/type-color';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StatusFavoritoPokemon } from '../../pokemons-favoritos/models/item-favorito';

@Component({
  selector: 'app-card-pokemon',
  standalone: true,
  imports: [NgClass, NgForOf, RouterLink],
  templateUrl: './card-pokemon.component.html',
  styleUrl: './card-pokemon.component.scss'
})
export class CardPokemonComponent {
  @Input({ required: true }) pokemon?: Pokemon
  @Output() statusFavoritoAlterado: EventEmitter<StatusFavoritoPokemon>

  public backgroundColor: typeColor = {
    Normal: 'fundo-tipo-normal',
    Fire: 'fundo-tipo-fogo',
    Water: 'fundo-tipo-agua',
    Electric: 'fundo-tipo-eletrico',
    Ice: 'fundo-tipo-gelo',
    Grass: 'fundo-tipo-grama',
    Bug: 'fundo-tipo-inseto',
    Poison: 'fundo-tipo-veneno',
    Flying: 'fundo-tipo-voador',
    Ground: 'fundo-tipo-terra',
    Rock: 'fundo-tipo-pedra',
    Fighting: 'fundo-tipo-lutador',
    Psychic: 'fundo-tipo-psiquico',
    Ghost: 'fundo-tipo-fantasma',
    Dark: 'fundo-tipo-sombrio',
    Fairy: 'fundo-tipo-fada',
    Steel: 'fundo-tipo-aco',
  };

  constructor() {
    this.statusFavoritoAlterado = new EventEmitter();
  }

  onFavoritarPokemon(pokemon: Pokemon): void {

    pokemon.isFavorito = !pokemon.isFavorito;

    this.statusFavoritoAlterado.emit({
      pokemon: pokemon,
      isFavorito: pokemon.isFavorito
    });
  }

}
