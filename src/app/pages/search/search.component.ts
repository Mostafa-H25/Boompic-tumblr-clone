import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GlobalService } from '../../services/global.service';

import { Theme } from '../../interfaces/models/themes.interface';
import { Post } from '../../interfaces/models/post.interface';
import { User } from '../../interfaces/models/user.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  baseUser!: User;
  theme!: Theme;

  posts!: Array<Post>;
  users!: Array<User>;

  search!: string | null;

  viewType: string = 'list';

  constructor(
    private route: ActivatedRoute,
    private globalService: GlobalService
  ) {
    this.route.paramMap.subscribe(
      (value) => (this.search = value.get('searchText'))
    );
  }

  ngOnInit(): void {
    this.globalService.theme.subscribe((value) => (this.theme = value));
    this.globalService.posts.subscribe((posts) => (this.posts = posts));
    this.globalService.baseUserObserver.subscribe((value) => {
      this.baseUser = value;
    });

    if (this.search) {
      this.posts = this.posts.filter(
        (post) =>
          post.tags.has(this.search!) || post.caption?.includes(this.search!)
      );
    }
  }

  toggleView(view: string) {
    this.viewType = view;
  }
}
