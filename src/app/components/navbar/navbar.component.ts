import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  providers: [DatePipe] 
})
export class NavbarComponent implements OnInit{
  data:any=[]
  formattedDate: string;
  ngOnInit(): void {
    this.data=localStorage.getItem('weatherData');
  }
  

  constructor(private datePipe: DatePipe) {
    // Get the current date and time
    const now = new Date();

    // Format the date as "Wed 1 Jan 2024 12:39"
    this.formattedDate = this.datePipe.transform(now, 'EEE d MMM y HH:mm a')!;
 
  }
  isNavbarVisible: boolean = false; 

  // Toggle navbar visibility
  toggleNavbar() {
    this.isNavbarVisible = !this.isNavbarVisible;
  }

}
