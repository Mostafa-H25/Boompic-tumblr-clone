import { Component, OnInit } from '@angular/core';

import { GlobalService } from '../../services/global.service';

import { Theme } from '../../interfaces/models/themes.interface';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit {
  theme!: Theme;

  constructor(private globalService: GlobalService) {}

  ngOnInit(): void {
    this.globalService.theme.subscribe((value) => (this.theme = value));
  }
}
