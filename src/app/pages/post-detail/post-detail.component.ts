import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  NavigationEnd,
  RoutesRecognized,
} from '@angular/router';
import { Observable, pipe, pairwise } from 'rxjs';
import { filter } from 'rxjs/operators';

import { GlobalService } from '../../services/global.service';

import { Theme } from '../../interfaces/models/themes.interface';
import { User } from '../../interfaces/models/user.interface';
import { Post } from '../../interfaces/models/post.interface';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  baseUser!: User;
  theme!: Theme;

  posts!: Array<Post>;
  users!: Array<User>;

  postId!: number;
  mainPost!: Post;

  constructor(
    private route: ActivatedRoute,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.globalService.theme.subscribe((value) => (this.theme = value));
    this.globalService.users.subscribe((users) => (this.users = users));
    this.globalService.posts.subscribe((posts) => (this.posts = posts));
    this.globalService.baseUserObserver.subscribe((value) => {
      this.baseUser = value;
    });

    this.route.paramMap.subscribe((value) => {
      this.postId = Number(value.get('postId'));

      this.mainPost = this.posts.find((post) => {
        return post.postId === this.postId;
      })!;
    });
  }

  closePage() {
    this.globalService.closePage();
  }
}
