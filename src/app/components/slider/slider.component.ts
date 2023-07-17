import { Component, Input, OnInit } from '@angular/core';
import { Theme } from '../../interfaces/models/themes.interface';
import { GlobalService } from 'src/app/services/global.service';
import { Slides } from 'src/app/interfaces/models/slidees';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
// implements OnInit
export class SliderComponent implements OnInit {
  @Input() slides!: Slides[];
  theme!: Theme;
  currentIndex: number = 0;
  slide!: Slides;

  constructor(private globalService: GlobalService) {}

  ngOnInit(): void {
    this.globalService.theme.subscribe((value) => (this.theme = value));
    this.slide = this.slides[this.currentIndex];
  }

  goRight() {
    if (this.currentIndex < this.slides.length - 1)
      this.slide = this.slides[this.currentIndex++];
  }
  goLeft() {
    if (this.currentIndex > 0) this.slide = this.slides[this.currentIndex--];
  }
}
