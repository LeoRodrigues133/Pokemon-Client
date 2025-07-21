import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  readonly url = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) { }

  public SelecionarTodos(offset: number = 0, limit= 0): Observable<any> {
    const urlCompleto = `${this.url}?offset=${offset}&limit=${limit}`

    return this.http.get(urlCompleto);
  }

  public SelecionarPorId(url: string): Observable<any> {
    return this.http.get<any>(url)
  }

  public SelecionarDetalhesPorId(id: number) {
    const urlCompleto = `${this.url}/${id}`;

    return this.http.get<any>(urlCompleto);
  }

}
