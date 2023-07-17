import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Theme } from 'src/app/interfaces/models/themes.interface';
import { User } from 'src/app/interfaces/models/user.interface';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css'],
})
export class ProfileHeaderComponent implements OnInit {
  baseUser!: User;
  theme!: Theme;
  users!: Array<User>;
  email: string | null = '';
  user!: User;

  isOptionsOpen: boolean = false;
  isSearchOpen: boolean = false;
  isFollowingActive: boolean = false;
  viewType: string = 'list';

  @Output() messageEvent = new EventEmitter<boolean>();
  @Output() viewTypeEvent = new EventEmitter<string>();

  constructor(
    private route: ActivatedRoute,
    public globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.globalService.theme.subscribe((value) => (this.theme = value));
    this.globalService.users.subscribe((users) => (this.users = users));
    this.globalService.baseUserObserver.subscribe((value) => {
      this.baseUser = value;
    });

    this.route.paramMap.subscribe((value) => {
      this.email = value.get('username');
    });

    this.user = this.users.find((user) => user.email === this.email)!;
  }

  follow(publisherId: number) {
    this.globalService.follow(publisherId);
  }

  toggleOptions() {
    this.isOptionsOpen = !this.isOptionsOpen;
  }
  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
  }

  toggleFollowing(title: string) {
    if (title === 'following') this.isFollowingActive = true;
    if (title === 'posts') this.isFollowingActive = false;
    this.messageEvent.emit(this.isFollowingActive);
  }

  clickedOutside(button: string) {
    switch (button) {
      case 'options':
        this.isOptionsOpen = false;
        break;
      case 'search':
        this.isSearchOpen = false;
        break;
    }
  }

  toggleView(view: string) {
    this.viewType = view;
    this.viewTypeEvent.emit(this.viewType);
  }
}
