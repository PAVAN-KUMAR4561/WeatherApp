import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientJsonpModule, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { compileNgModule } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  data: any = {};
  iconUrl: any;
  constructor(private http:HttpClient){}
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
        this.data=response;
        localStorage.setItem('weatherData', JSON.stringify(response));
      },
      (error) => {
        console.error(error); 
      }
    );

  }
  unit: string = 'C'; 

  toggleUnit(unit: string) {
    this.unit = unit;
  }
  infav:boolean=false
  addtoFav(){
    const fav=JSON.parse(localStorage.getItem('favourite')||'[]');
    let newfav = {
      name: this.data.location.name,
      region: this.data.location.region,
      localtime: this.data.location.localtime,
      text: this.data.current.condition.text,
      icon: this.data.current.condition.icon,
      temp_c: this.data.current.temp_c,
    };
    fav.push(newfav)
    localStorage.setItem('favourite',JSON.stringify(fav))
    console.log("added")
    this.infav=!this.infav
  }


}