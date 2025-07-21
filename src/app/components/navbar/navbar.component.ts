import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  dexMode: boolean = false;
  mode: string = "";

  alternarMode() {
    this.dexMode = !this.dexMode;
    this.mode = this.dexMode ? "bg-black" : "";
  }
}
