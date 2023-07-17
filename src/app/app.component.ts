import { Component, OnInit } from '@angular/core';

import { GlobalService } from './services/global.service';

import { Theme } from './interfaces/models/themes.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GlobalService],
})
export class AppComponent implements OnInit {
  theme!: Theme;

  constructor(public globalService: GlobalService) {}

  ngOnInit(): void {
    this.globalService.theme.subscribe((value) => (this.theme = value));
  }
}
