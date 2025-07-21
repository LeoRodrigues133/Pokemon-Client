import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-busca',
  standalone: true,
  imports: [],
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.scss'
})
export class BuscaComponent {
  @Output() Busca: EventEmitter<string>;

  constructor() {
    this.Busca = new EventEmitter();
  }

  public Buscar(texto: string): void {
    this.Busca.emit(texto);
  }
}
