import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { Theme } from '../interfaces/models/themes.interface';
import { NewPostStyle } from '../interfaces/models/newPostStyle.interface';
import { User } from '../interfaces/models/user.interface';
import { Post } from '../interfaces/models/post.interface';
import { LikedPost } from '../interfaces/models/likedPosts.interface';
import { RebloggedPost } from '../interfaces/models/rebloggedPosts.interface';
import { Reply } from '../interfaces/models/reply.interface';

import { themes } from '../../assets/data/themes';
import { usersModified } from '../../assets/data/users2';
import { postsModified } from '../../assets/data/posts2';
import { newPostStyle } from '../../assets/data/newPostStyle';
import { rebloggedPostsModified } from '../../assets/data/reblogedPosts2';
import { repliesModified } from '../../assets/data/replies2';
import { likedPostsModified } from '../../assets/data/likedPosts2';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  private themes: Theme[] = themes;
  private _theme = new BehaviorSubject<Theme>(this.themes[0]);
  public newPostStyles: NewPostStyle[] = newPostStyle;

  private prevPage!: string;
  private currPage!: string;

  private _users = new BehaviorSubject<User[]>(usersModified);
  private _posts = new BehaviorSubject<Post[]>(postsModified);

  private _replies = new BehaviorSubject<Reply[]>(repliesModified);
  private _reblogs = new BehaviorSubject<RebloggedPost[]>(
    rebloggedPostsModified
  );
  private _likes = new BehaviorSubject<LikedPost[]>(likedPostsModified);

  private _baseUser = new BehaviorSubject<User>(this.users.getValue()[3]);

  baseUserObserver = this._baseUser.asObservable();
  private publisher!: User;

  constructor(private router: Router) {
    // this.users.subscribe(
    //   (users) =>
    //     (this.baseUser = users.find((user: User) => user.userId === 3)!)
    // );

    this.currPage = this.router.url;
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.prevPage = this.currPage;
        this.currPage = event.url;
      }
    });
  }

  logInUser(user: User) {
    this.baseUser.next(user);
  }

  logOutUser() {
    this.baseUser.getValue().isAuthenticated = false;
    this.router.navigate(['/explore']);
  }

  toggleTheme(themeId: number) {
    if (themeId === this.themes.length) {
      this.theme.next(this.themes[0]);
    } else {
      this.theme.next(themes[themeId++]);
    }
  }

  getPreviousUrl() {
    return this.prevPage;
  }

  closePage() {
    this.router.navigate([this.prevPage]);
  }

  follow(publisherId: number): void {
    this.users.subscribe(
      (users) =>
        (this.publisher = users.find((user) => user.userId === publisherId)!)
    );

    if (this.baseUser.following.has(this.publisher.userId)) {
      this.users.subscribe((users) =>
        users
          .find((user) => user.userId === this.baseUser.userId)
          ?.following.delete(this.publisher.userId)
      );
      this.users.subscribe((users) =>
        users
          .find((user) => user.userId === publisherId)
          ?.followers.delete(this.baseUser.userId)
      );
    } else {
      this.users.subscribe((users) =>
        users
          .find((user) => user.userId === this.baseUser.userId)
          ?.following.add(this.publisher.userId)
      );
      this.users.subscribe((users) =>
        users
          .find((user) => user.userId === publisherId)
          ?.followers.add(this.baseUser.userId)
      );
    }
  }

  public get baseUser() {
    return this._baseUser;
  }
  public set baseUser(value: any) {
    this._baseUser.next(value);
  }
  public get theme() {
    return this._theme;
  }
  public set theme(value) {
    this._theme = value;
  }
  public get users() {
    return this._users;
  }
  public set users(value) {
    this._users = value;
  }
  public get posts() {
    return this._posts;
  }
  public set posts(value) {
    this._posts = value;
  }
  public get replies() {
    return this._replies;
  }
  public set replies(value) {
    this._replies = value;
  }
  public get reblogs() {
    return this._reblogs;
  }
  public set reblogs(value) {
    this._reblogs = value;
  }
  public get likes() {
    return this._likes;
  }
  public set likes(value) {
    this._likes = value;
  }
}
