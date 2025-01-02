import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HomeComponent } from '../../components/home/home.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NavbarComponent,HomeComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
