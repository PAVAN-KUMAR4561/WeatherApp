import { Component, EventEmitter, Output } from '@angular/core';
import { FavouriteComponent } from '../favourite/favourite.component';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [FavouriteComponent],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {

  @Output() response = new EventEmitter<boolean>();

  handleResponse(answer: boolean) {
    this.response.emit(answer); 
  }


}
