
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HomeComponent } from '../../components/home/home.component';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NavbarComponent, HomeComponent, HttpClientModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  data: any = {};
  currentWeatherData: any; 
  recentSearches: any[] = []; 

  constructor(
    private http: HttpClient,
    private router: Router,
    private sharedService: SharedService
  ) {}

  private apiUrl = 'https://weatherapi-com.p.rapidapi.com/current.json';
  private headers = new HttpHeaders({
    'X-RapidAPI-Key': 'af3431978amshc69811be2a6a5cep1e62abjsnbf2a965a707d',
    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
  });

  ngOnInit(cityName: string = 'Udupi'): void {
    this.loadRecentSearches();
    
    this.sharedService.currentData.subscribe((data) => {
      this.currentWeatherData = data;
      console.log('Current Weather Data:', this.currentWeatherData);
    });

    this.fetchWeatherData(cityName, false); 
  }

  private fetchWeatherData(location: string, storeSearch: boolean = true): void {
    this.getCurrentWeather(location).subscribe(
      (response) => {
        this.data = response;
        this.sharedService.updateData(response); 
        localStorage.setItem('weatherData', JSON.stringify(response)); 

        if (storeSearch) {
          this.storeRecentSearch(response);
        }
      },
      (error) => {
        console.error(error); 
      }
    );
  }

  getCurrentWeather(location: string): Observable<any> {
    return this.http.get(this.apiUrl, {
      headers: this.headers,
      params: { q: location },
    });
  }

  onSearchSelection(item: any) {
    this.handleSelectedItem(item);
  }

  handleSelectedItem(item: any) {
    const cityName = item && item.name ? item.name : 'Udupi'; 
    console.log(cityName);
    console.log('City name working');
    this.fetchWeatherData(cityName, true); 
  }

  storeRecentSearch(response: any) {
    const recentSearches = JSON.parse(localStorage.getItem('recentSearch') || '[]');

    const updatedSearches = recentSearches.filter(
      (search: any) => search.location.name.toLowerCase() !== response.location.name.toLowerCase()
    );

    updatedSearches.unshift(response);

    if (updatedSearches.length > 5) {
      updatedSearches.pop(); 
    }

    localStorage.setItem('recentSearch', JSON.stringify(updatedSearches));

    this.loadRecentSearches();
  }

  loadRecentSearches() {
    this.recentSearches = JSON.parse(localStorage.getItem('recentSearch') || '[]');
  }
}
