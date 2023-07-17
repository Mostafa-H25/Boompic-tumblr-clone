import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalService } from '../../services/global.service';

import { Theme } from '../../interfaces/models/themes.interface';
import { Post } from '../../interfaces/models/post.interface';
import { User } from '../../interfaces/models/user.interface';

@Component({
  selector: 'app-for-you',
  templateUrl: './for-you.component.html',
  styleUrls: ['./for-you.component.css'],
})
export class ForYouComponent implements OnInit {
  baseUser!: User;
  theme!: Theme;

  posts!: Array<Post>;

  filterBy: string = 'user';

  constructor(private router: Router, private globalService: GlobalService) {}

  ngOnInit(): void {
    this.globalService.theme.subscribe((value) => (this.theme = value));
    this.globalService.posts.subscribe((posts) => (this.posts = posts));
    this.globalService.baseUserObserver.subscribe((value) => {
      this.baseUser = value;
    });

    if (!this.baseUser.isAuthenticated) {
      this.router.navigate(['/explore']);
    }
  }
}
