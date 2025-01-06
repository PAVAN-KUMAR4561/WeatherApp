import { Component, OnInit } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favourite',
  standalone: true,
  imports: [PopupComponent,CommonModule],
  templateUrl: './favourite.component.html',
  styleUrl: './favourite.component.css'
})
export class FavouriteComponent implements OnInit {
  climate:any=[]
  ngOnInit(): void {
    this.climate=JSON.parse(localStorage.getItem('favourite')||'[]')
   
  }

  
  showPrompt = false;

  openPrompt() {
    this.showPrompt = true; 
  }

  handleResponse(response: boolean) {
    this.showPrompt = false; 
    if (response) {
      localStorage.removeItem('favourite');
      this.climate = [];
    }
  }
 handleclick(index:number){
  this.climate.splice(index,1);
  localStorage.setItem('favourite',JSON.stringify(this.climate))
 }

}
