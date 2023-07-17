import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';

import { GlobalService } from '../../services/global.service';

import { Theme } from '../../interfaces/models/themes.interface';
import { NewPostStyle } from '../../interfaces/models/newPostStyle.interface';
import { User } from 'src/app/interfaces/models/user.interface';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent implements OnInit {
  theme!: Theme;
  newPostStyles!: NewPostStyle[];
  baseUser!: User;

  constructor(private router: Router, private globalService: GlobalService) {}

  ngOnInit(): void {
    this.globalService.theme.subscribe((value) => (this.theme = value));
    this.newPostStyles = this.globalService.newPostStyles;
    this.globalService.baseUserObserver.subscribe((value) => {
      this.baseUser = value;
    });

    if (!this.baseUser.isAuthenticated) {
      this.router.navigate(['/explore']);
    }
  }

  closePage() {
    this.globalService.closePage();
  }
}
