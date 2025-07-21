import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../listagem/models/Pokemon';
import { PokeApiService } from '../../services/poke-api.service';
import { ToTitleCase } from '../../Utils/convert-to-tittle-case';
import { MapearTipoPokemon } from '../../Utils/mapear-tipos-pokemon';
import { CardPokemon2Component } from './card-pokemon2/card-pokemon2.component';

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [NgForOf, CardPokemon2Component],
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.scss'
})
export class ListagemComponent implements OnInit {

  public Pokedata: Pokemon[];
  public displayedPokedex: Pokemon[];
  offset: number;
  limit: number;

  constructor(private pokeService: PokeApiService) {
    this.Pokedata = [];
    this.displayedPokedex = [];
    this.offset = 0;
    this.limit = 0;
  }

  ngOnInit(): void {
    this.ObterPokemons()
  }

  BuscarMaisResultados(): void {
    this.offset += 20;

    this.ObterPokemons();
  }

  public FiltrarPokemons(texto: string): void {

    if (texto.length !== 0) {

      this.displayedPokedex = this.Pokedata.filter(f => {
        return f.name.toLowerCase().includes(texto);
      });
    }
    else {
      this.limit = 0;
      this.offset = 0;
      this.displayedPokedex = [];
      
      if (this.displayedPokedex.length === 0)
        this.ObterPokemons();
    }
  }
  ObterPokemons() {
    this.pokeService
      .SelecionarTodos(this.offset)
      .subscribe((res) => {

        const poke = res.results as any[]

        for (let res of poke) {

          this.pokeService
            .SelecionarPorId(res.url)
            .subscribe((response: any) => {
              const pokemon = this.MapearPokemon(response)

              this.displayedPokedex.push(pokemon)
            });

        }
      });
  }
  ObterTodosOsPokemons() {

    this.pokeService
      .SelecionarTodos(this.offset, 1302)
      .subscribe((res) => {

        const poke = res.results as any[]

        for (let res of poke) {

          this.pokeService
            .SelecionarPorId(res.url)
            .subscribe((response: any) => {
              const pokemon = this.MapearPokemon(response)

              this.Pokedata.push(pokemon);
            });

        }
      });


  }

  private MapearPokemon(obj: any): Pokemon {

    return {
      id: obj.id,
      name: ToTitleCase(obj.name),
      sprites: obj.sprites.front_default,
      types: obj.types.map(MapearTipoPokemon)
    }
  }


}
