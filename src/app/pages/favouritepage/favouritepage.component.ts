import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FavouriteComponent } from '../../components/favourite/favourite.component';

@Component({
  selector: 'app-favouritepage',
  standalone: true,
  imports: [NavbarComponent,FavouriteComponent],
  templateUrl: './favouritepage.component.html',
  styleUrl: './favouritepage.component.css'
})
export class FavouritepageComponent {

}
