

import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from '../../services/shared.service'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'], 
})
export class HomeComponent implements OnInit {
  data: any = {}; 
  unit: string = 'C'; 
  infav: boolean = false; 
  
  constructor(private http: HttpClient, private sharedService: SharedService) {}

  private apiUrl = 'https://weatherapi-com.p.rapidapi.com/current.json';
  private headers = new HttpHeaders({
    'X-RapidAPI-Key': 'af3431978amshc69811be2a6a5cep1e62abjsnbf2a965a707d',
    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
  });

  getCurrentWeather(location: string): Observable<any> {
    return this.http.get(this.apiUrl, {
      headers: this.headers,
      params: { q: location },
    });
  }

  ngOnInit(): void {
    this.getCurrentWeather('Udupi').subscribe(
      (response) => {
        this.data = response; 
        localStorage.setItem('weatherData', JSON.stringify(response));

        this.checkIfInFav();

        this.sharedService.updateData(response);
      },
      (error) => {
        console.error(error); 
      }
    );

    this.sharedService.currentData.subscribe((data: any) => {
      this.data = data; 
      this.checkIfInFav(); 
    });
  }

  toggleUnit(unit: string): void {
    this.unit = unit; 
  }

  checkIfInFav(): void {
    const fav = JSON.parse(localStorage.getItem('favourite') || '[]');
    const newFav = {
      name: this.data.location.name,
      region: this.data.location.region,
    };

    this.infav = fav.some((item: any) => 
      item.name === newFav.name && item.region === newFav.region
    );
  }

  addtoFav(): void {
    const fav = JSON.parse(localStorage.getItem('favourite') || '[]');  // Fetch current favourites from localStorage

    const newFav = {
      name: this.data.location.name,
      region: this.data.location.region,
      localtime: this.data.location.localtime,
      text: this.data.current.condition.text,
      icon: this.data.current.condition.icon,
      temp_c: this.data.current.temp_c,
    };

    const isAlreadyInFav = fav.some((item: any) => 
      item.name === newFav.name && item.region === newFav.region
    );

    if (isAlreadyInFav) {
      console.log('This location is already in your favourites');
      return;  
    }

    fav.push(newFav);
    
    localStorage.setItem('favourite', JSON.stringify(fav));

    console.log('Added to favourites');
    this.infav = true; 
  }

  removeFav(): void {
    const fav = JSON.parse(localStorage.getItem('favourite') || '[]');  
    const newFav = {
      name: this.data.location.name,
      region: this.data.location.region,
    };

    const updatedFav = fav.filter((item: any) => 
      !(item.name === newFav.name && item.region === newFav.region)
    );

    localStorage.setItem('favourite', JSON.stringify(updatedFav));
    this.infav = false;  
    console.log('Removed from favourites');
  }

  roundNumber(number:number){
    return Math.round(number);
  }
}
