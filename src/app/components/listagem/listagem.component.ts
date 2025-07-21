import { Pokemon } from './models/Pokemon';
import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { BuscaComponent } from "../busca/busca.component";
import { PokeApiService } from '../../services/poke-api.service';
import { ToTitleCase } from '../../Utils/convert-to-tittle-case';
import { MapearTipoPokemon } from '../../Utils/mapear-tipos-pokemon';
import { CardPokemonComponent } from "./card-pokemon/card-pokemon.component";
import { StatusFavoritoPokemon } from '../pokemons-favoritos/models/item-favorito';
import { PokemonsFavoritosComponent } from "../pokemons-favoritos/pokemons-favoritos.component";
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [NgForOf, CardPokemonComponent, BuscaComponent, PokemonsFavoritosComponent],
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.scss'
})
export class ListagemComponent implements OnInit {

  public Pokedata: Pokemon[];
  public displayedPokedex: Pokemon[];
  public pokemonsFavoritos: Pokemon[];
  offset: number;
  limit: number;

  constructor(private pokeService: PokeApiService, private localStorageService: LocalStorageService) {
    this.Pokedata = [];
    this.displayedPokedex = [];
    this.pokemonsFavoritos = localStorageService.DesserealizarFavoritos();
    this.offset = 0;
    this.limit = 0;
  }

  ngOnInit(): void {
    this.ObterPokemons();
    this.ObterTodosOsPokemons();
  }

  BuscarMaisResultados(): void {
    this.offset += 20;

    this.ObterPokemons();
  }

  public alternarStatusFavorito(status: StatusFavoritoPokemon) {
    if (status.isFavorito === true) {
      this.pokemonsFavoritos.push(status.pokemon);
    } else
      this.pokemonsFavoritos = this.pokemonsFavoritos.filter(
        p => p.id !== status.pokemon.id)

    this.localStorageService.SerealizarFavoritos(this.pokemonsFavoritos);
  }

  public FiltrarPokemons(t: string): void {
    const texto = t.toLowerCase();

    if (texto.length !== 0) {

      this.displayedPokedex = this.Pokedata.filter(p => {
        const pokemon = p.name.toLowerCase().includes(texto);
        const pokemonType = p.types.some(t => t.name.toLowerCase().includes(texto));

        console.log(this.displayedPokedex);
        return pokemon || pokemonType;
      });
    }
    else {
      this.limit = 0;
      this.offset = 0;
      this.displayedPokedex = [];
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
      types: obj.types.map(MapearTipoPokemon),
      isFavorito: this.pokemonsFavoritos.some(p => p.id == obj.id)
    }
  }


}
