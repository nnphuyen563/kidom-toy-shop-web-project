import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent {

  @Input()
  stars!: number;

  @Input()
  size: number = 1;
  
  get style () {
    return {
      'width.rem': this.size,
      'height.rem': this.size,
      'marginRight': this.size / 6,

    }
  }

  getStarImage(current: number): string {
    const previousHalf = current - 0.5;
    const imageName = 
    this.stars >= current
    ? 'star-full'
    : this.stars >= previousHalf 
    ? 'star-half'
    : 'star-empty';
    return `/assets/star/${imageName}.png`;
  }

}
