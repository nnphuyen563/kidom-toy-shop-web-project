import { Component } from '@angular/core';


interface Thumbnail { 
  imageUrl: String; 
} 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  thumbnails: Thumbnail[] = [
    { imageUrl: 'path_to_thumbnail_1.jpg' },
    { imageUrl: 'path_to_thumbnail_2.jpg' },
    { imageUrl: 'path_to_thumbnail_3.jpg' },
  ]
}
