


import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule], 
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [DatePipe],
})
export class NavbarComponent implements OnInit {
  data: any = [];
  formattedDate: string;

  
  searchQuery: string = ''; 
  searchResults: any[] = []; 

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const searchContainer = document.querySelector('.search');

    if (!searchContainer?.contains(event.target as Node)) {
      this.searchResults = []; 
    }
  }

  @Output() searchSelection = new EventEmitter<any>();

  private headers = new HttpHeaders({
    'X-RapidAPI-Key': 'af3431978amshc69811be2a6a5cep1e62abjsnbf2a965a707d',
    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
  });

  private apiUrl = 'https://weatherapi-com.p.rapidapi.com/search.json'; 

  constructor(private datePipe: DatePipe, private http: HttpClient) {
    const now = new Date();

    this.formattedDate = this.datePipe.transform(now, 'EEE d MMM y HH:mm a')!;
  }

  ngOnInit(): void {
    this.data = localStorage.getItem('weatherData');
  }

  onSearchChange() {
    if (this.searchQuery.length >= 3) {
      this.http
        .get<any>(this.apiUrl, {
          headers: this.headers,
          params: { q: this.searchQuery },
        })
        .subscribe(
          (response: any[]) => {
            this.searchResults = response;
          },
          (error: any) => {
            console.error('Error fetching data:', error);
          }
        );
    }
  }

  onSuggestionClick(item: any) {
    this.searchQuery = item.name;
    this.searchResults = [];
    this.searchSelection.emit(item);
    this.closeSearchBar();
  }

  isNavbarVisible: boolean = false;

  isSearchBarVisible = false;

  toggleNavbar() {
    this.isNavbarVisible = !this.isNavbarVisible;
  }

  toggleSearchBar() {
    this.isSearchBarVisible = !this.isSearchBarVisible;
  }
  closeSearchBar() {
    this.isSearchBarVisible = false;
    this.searchResults = []; 
  }
}
