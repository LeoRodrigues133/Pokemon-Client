import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Pokemon } from '../listagem/models/Pokemon';

@Component({
  selector: 'app-pokemons-favoritos',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink],
  templateUrl: './pokemons-favoritos.component.html',
  styleUrl: './pokemons-favoritos.component.scss'
})
export class PokemonsFavoritosComponent {
  @Input({ required: true }) pokemonsFavoritos!: Pokemon[];

  constructor() {
  }
}
