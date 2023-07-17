import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { GlobalService } from '../../services/global.service';

import { Theme } from '../../interfaces/models/themes.interface';
import { User } from '../../interfaces/models/user.interface';
import { Post } from '../../interfaces/models/post.interface';
import { LikedPost } from '../../interfaces/models/likedPosts.interface';
import { Slides } from '../../interfaces/models/slidees';

import { likedPostsModified } from '../../../assets/data/likedPosts2';
import { slides } from '../../../assets/data/slides';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  baseUser!: User;
  users!: User[];
  posts!: Post[];
  likedPosts: LikedPost[] = likedPostsModified;
  slides: Slides[] = slides;
  theme!: Theme;

  baseUserPosts!: Post[];
  baseUserLikedPosts!: LikedPost[];

  logInModal: boolean = false;
  anonymousUser!: User;
  email: string = '';
  password: string = '';
  passwordError: string = '';
  continueModal: string = '';

  isShopOpen: boolean = false;
  isNotificationOpen: boolean = false;
  isSettingsOpen: boolean = false;
  isAccountOpen: boolean = false;
  isAccountUserOpen: boolean = true;
  isMenuOpen: boolean = false;
  search!: string;

  constructor(private router: Router, public globalService: GlobalService) {}

  ngOnInit(): void {
    this.globalService.theme.subscribe((value) => (this.theme = value));
    this.globalService.users.subscribe((users) => (this.users = users));
    this.globalService.posts.subscribe((posts) => (this.posts = posts));
    this.globalService.baseUserObserver.subscribe((value) => {
      this.baseUser = value;
    });

    this.baseUserLikedPosts = this.likedPosts.filter(
      (post) => post.user.userId === this.baseUser.userId
    );

    this.baseUserPosts = this.posts.filter(
      (post) => post.user.userId === this.baseUser.userId
    );
  }

  toggleTheme() {
    this.globalService.toggleTheme(this.theme.themeId);
    return this.theme;
  }

  toggleShop() {
    this.isShopOpen = !this.isShopOpen;
  }

  toggleNotification() {
    this.isNotificationOpen = !this.isNotificationOpen;
  }

  toggleAccount() {
    this.isAccountOpen = !this.isAccountOpen;
  }

  toggleAccountUser() {
    this.isAccountUserOpen = !this.isAccountUserOpen;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleSettings() {
    this.isSettingsOpen = !this.isSettingsOpen;
  }

  toggleLogInModal() {
    this.logInModal = !this.logInModal;
  }

  continue(step: string) {
    switch (step) {
      case 'email':
        this.continueModal = step;
        break;
      case 'emailSubmitted':
        if (this.users.find((user) => user.email === this.email)) {
          this.anonymousUser = this.users.find(
            (user) => user.email === this.email
          )!;
          this.continueModal = step;
        } else {
          this.continueModal = 'signUpPassword';
        }
        break;
      case 'passwordSubmitted':
        if (this.anonymousUser.password === this.password) {
          this.anonymousUser.lastName = 'hafez';
          this.anonymousUser.isActive = true;
          this.anonymousUser.isAuthenticated = true;
          this.globalService.logInUser(this.anonymousUser);

          this.logInModal = false;
          this.continueModal = '';

          this.router.navigate(['/']);
        } else {
          this.continueModal = 'emailSubmitted';
          this.passwordError = 'Password incorrect!';
        }
        break;

      default:
        break;
    }
  }

  logOut() {
    this.globalService.logOutUser();
  }

  clickedOutside(button: string) {
    switch (button) {
      case 'shop':
        this.isShopOpen = false;
        break;
      case 'notification':
        this.isNotificationOpen = false;
        break;
      case 'account':
        this.isAccountOpen = false;
        break;
      case 'menu':
        this.isMenuOpen = false;
        break;
    }
  }

  onSubmit(searchForm: NgForm) {
    this.search = searchForm.value.search;
    this.router.navigate(['/search', this.search]);
  }
}
