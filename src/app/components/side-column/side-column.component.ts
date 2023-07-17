import { Component, Input, OnInit } from '@angular/core';

import { GlobalService } from '../../services/global.service';
import { User } from '../../interfaces/models/user.interface';
import { Theme } from '../../interfaces/models/themes.interface';
import { Post } from '../../interfaces/models/post.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-side-column',
  templateUrl: './side-column.component.html',
  styleUrls: ['./side-column.component.css'],
})
export class SideColumnComponent implements OnInit {
  baseUser!: User;
  users!: Array<User>;
  posts!: Array<Post>;
  newUsers!: Array<User> | any;
  randomPost!: Post;
  theme!: Theme;

  constructor(public globalService: GlobalService) {}

  ngOnInit(): void {
    this.globalService.theme.subscribe((value) => (this.theme = value));
    this.globalService.users.subscribe((users) => (this.users = users));
    this.globalService.posts.subscribe((posts) => (this.posts = posts));
    this.globalService.baseUserObserver.subscribe((value) => {
      this.baseUser = value;
    });

    this.newUsers = this.getFollowing().slice(0, 5);
    this.randomPost = this.generateRandom();
  }

  generateRandom() {
    let max = this.posts.length;
    let random = Math.floor(Math.random() * max);
    return this.posts[random];
  }

  follow(publisherId: number): User {
    this.globalService.follow(publisherId);
    return this.baseUser;
  }

  getFollowing(): Array<User> {
    let followingArr: Set<number> = this.baseUser.following;
    this.newUsers = this.users.filter((user) => !followingArr.has(user.userId));
    this.newUsers = this.newUsers.filter(
      (user: any) => user.userId !== this.baseUser.userId
    );
    return this.newUsers;
  }

  removePublisher(publisherId: number): User[] {
    this.newUsers = this.getFollowing();
    this.newUsers = this.newUsers.filter(
      (user: any) => user.userId !== publisherId
    );
    this.newUsers = this.newUsers.slice(0, 5);
    return this.newUsers;
  }

  changeBlogs(changedUsers: Array<User>): User[] {
    let changedUsersIdArr = changedUsers.map((user) => user.userId);
    this.newUsers = this.getFollowing();
    this.newUsers = this.newUsers.filter(
      (user: any) => !changedUsersIdArr.includes(user.userId)
    );
    this.newUsers = this.newUsers.slice(0, 5);
    return this.newUsers;
  }

  toggleTheme() {
    this.globalService.toggleTheme(this.theme.themeId);
    return this.theme;
  }
}
