import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FavouriteComponent } from '../../components/favourite/favourite.component';
import { RecentComponent } from '../../components/recent/recent.component';

@Component({
  selector: 'app-recentpage',
  standalone: true,
  imports: [NavbarComponent,RecentComponent],
  templateUrl: './recentpage.component.html',
  styleUrl: './recentpage.component.css'
})
export class RecentpageComponent {

}
