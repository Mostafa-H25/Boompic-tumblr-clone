import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalService } from '../../services/global.service';

import { Post } from '../../interfaces/models/post.interface';
import { Theme } from '../../interfaces/models/themes.interface';
import { User } from '../../interfaces/models/user.interface';

@Component({
  selector: 'app-hubs',
  templateUrl: './hubs.component.html',
  styleUrls: ['./hubs.component.css'],
})
export class HubsComponent implements OnInit {
  posts!: Array<Post>;
  baseUser!: User;
  theme!: Theme;

  filterBy: string = 'hubs';

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
