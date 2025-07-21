import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { detalhesPokemon } from './models/detalhes';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { typeColor } from '../listagem/models/type-color';
import { ToTitleCase } from '../../Utils/convert-to-tittle-case';
import { PokeApiService } from '../../services/poke-api.service';
import { MapearTipoPokemon } from '../../Utils/mapear-tipos-pokemon';



@Component({
  selector: 'app-detalhes',
  standalone: true,
  imports: [NgIf, NgForOf, NgClass],
  templateUrl: './detalhes.component.html',
  styleUrl: './detalhes.component.scss'
})
export class DetalhesComponent implements OnInit {
  id?: number;
  detalhesPokemon?: detalhesPokemon;

  constructor(
    private route: ActivatedRoute,
    private apiService: PokeApiService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    if (!this.id) return;

    this.apiService.SelecionarDetalhesPorId(this.id)
      .subscribe((res) => {
        this.detalhesPokemon = this.MapearDetalhes(res);
      });

  }
  private MapearDetalhes(obj: any): detalhesPokemon {
    return {
      id: obj.id,
      name: ToTitleCase(obj.name),
      sprites: [
        obj.sprites.front_default,
        obj.sprites.back_default,
        obj.sprites.back_female,
        obj.sprites.back_shiny,
        obj.sprites.back_shiny_female,
        obj.sprites.front_female,
        obj.sprites.front_shiny,
        obj.sprites.front_shiny_female
      ],
      types: obj.types.map(MapearTipoPokemon),
      height: obj.height * 10,
      weight: obj.weight / 10
    };
  }

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
