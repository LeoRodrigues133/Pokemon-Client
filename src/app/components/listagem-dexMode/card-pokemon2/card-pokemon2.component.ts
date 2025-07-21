import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass, NgForOf } from '@angular/common';
import { typeColor } from '../../listagem/models/type-color';
import { Pokemon } from '../../listagem/models/Pokemon';

@Component({
  selector: 'app-card-pokemon2',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card-pokemon2.component.html',
  styleUrl: './card-pokemon2.component.scss'
})
export class CardPokemon2Component {
@Input() pokemon2?:Pokemon

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
}
