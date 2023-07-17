import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { GlobalService } from '../../../app/services/global.service';

import { Theme } from '../../interfaces/models/themes.interface';
import { User } from '../../interfaces/models/user.interface';
import { Reply } from '../../interfaces/models/reply.interface';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css'],
})
export class ReplyComponent implements OnInit {
  @Input() reply!: Reply;
  baseUser!: User;
  theme!: Theme;

  isOptionsOpen: boolean = false;

  constructor(public globalService: GlobalService) {}

  ngOnInit(): void {
    this.globalService.theme.subscribe((value) => (this.theme = value));
    this.globalService.baseUserObserver.subscribe((value) => {
      this.baseUser = value;
    });
  }

  toggleOptions() {
    this.isOptionsOpen = !this.isOptionsOpen;
  }

  clickedOutside(button: string) {
    switch (button) {
      case 'options':
        this.isOptionsOpen = false;
        break;
    }
  }
}
