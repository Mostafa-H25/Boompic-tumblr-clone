import { Component, OnInit } from '@angular/core';

import { GlobalService } from '../../services/global.service';

import { Theme } from '../../interfaces/models/themes.interface';
import { User } from '../../interfaces/models/user.interface';
import { Post } from '../../interfaces/models/post.interface';

@Component({
  selector: 'app-explore-today',
  templateUrl: './explore-today.component.html',
  styleUrls: ['./explore-today.component.css'],
})
export class ExploreTodayComponent implements OnInit {
  theme!: Theme;
  baseUser!: User;

  posts!: Array<Post>;
  users!: Array<User>;

  viewType: string = 'list';

  constructor(private globalService: GlobalService) {}

  ngOnInit(): void {
    this.globalService.theme.subscribe((value) => (this.theme = value));
    this.globalService.posts.subscribe((posts) => (this.posts = posts));
    this.globalService.baseUserObserver.subscribe((value) => {
      this.baseUser = value;
    });
  }

  toggleView(view: string) {
    this.viewType = view;
  }
}
