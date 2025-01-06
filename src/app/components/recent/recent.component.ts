

import { Component, OnInit } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recent',
  standalone: true,
  imports: [PopupComponent, CommonModule],
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.css']
})
export class RecentComponent implements OnInit {
  climate: any[] = [];
  favourites: any[] = [];

  ngOnInit(): void {
    this.climate = JSON.parse(localStorage.getItem('recentSearch') || '[]');
    this.favourites = JSON.parse(localStorage.getItem('favourite') || '[]');
  }

  showPrompt = false;

  openPrompt() {
    this.showPrompt = true; 
  }

  handleResponse(response: boolean) {
    this.showPrompt = false; 
    if (response) {
      localStorage.removeItem('recentSearch');
      this.climate = [];
    }
  }

  handleclick(index: number) {
    this.climate.splice(index, 1);
    localStorage.setItem('recentSearch', JSON.stringify(this.climate));
  }

  isCityInFav(city: any): boolean {
    return this.favourites.some(fav => fav.name === city.location.name && fav.region === city.location.region);
  }

  toggleFav(city: any): void {
    const favIndex = this.favourites.findIndex(fav => fav.name === city.location.name && fav.region === city.location.region);

    if (favIndex > -1) {
      this.favourites.splice(favIndex, 1);
    } else {
      const newFav = {
        name: city.location.name,
        region: city.location.region,
        localtime: city.location.localtime,
        text: city.current.condition.text,
        icon: city.current.condition.icon,
        temp_c: city.current.temp_c,
      };
      this.favourites.push(newFav);
    }

    localStorage.setItem('favourite', JSON.stringify(this.favourites));
  }
}
