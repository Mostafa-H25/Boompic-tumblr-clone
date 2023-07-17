import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GlobalService } from '../../services/global.service';

import { Theme } from '../../interfaces/models/themes.interface';
import { User } from '../../interfaces/models/user.interface';
import { Post } from '../../interfaces/models/post.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  @ViewChild('content') content!: ElementRef;
  baseUser!: User;
  theme!: Theme;

  posts!: Array<Post>;
  users!: Array<User>;

  email: string | null = '';
  user!: User;

  isNotesOpen: boolean = false;
  isExpandOpen: boolean = false;
  isFollowingActive: boolean = false;
  viewType: string = 'list';

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
      this.email = value.get('username');
    });

    this.user = this.users.find((user) => user.email === this.email)!;

    this.posts = this.posts.filter((post) => post.user.email === this.email);
  }

  closePage() {
    this.globalService.closePage();
  }

  scrollTop() {
    this.content.nativeElement.scrollTop = 0;
  }

  notesToggle() {
    this.isNotesOpen = !this.isNotesOpen;
  }

  expandToggle() {
    this.isExpandOpen = !this.isExpandOpen;
  }

  receiveMessage(event: any) {
    this.isFollowingActive = event;
  }

  receiveViewType(event: any) {
    this.viewType = event;
  }

  clickedOutside(button: string) {
    switch (button) {
      case 'notes':
        this.isNotesOpen = false;
        break;
      case 'expand':
        this.isExpandOpen = false;
        break;
    }
  }
}
