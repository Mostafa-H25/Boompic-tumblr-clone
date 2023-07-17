import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Theme } from 'src/app/interfaces/models/themes.interface';
import { User } from 'src/app/interfaces/models/user.interface';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-profile-following',
  templateUrl: './profile-following.component.html',
  styleUrls: ['./profile-following.component.css'],
})
export class ProfileFollowingComponent implements OnInit {
  @Input() userId!: number;
  baseUser!: User;
  users!: Array<User>;
  theme!: Theme;
  user!: User;

  constructor(public globalService: GlobalService) {}

  ngOnInit(): void {
    this.globalService.theme.subscribe((value) => (this.theme = value));
    this.globalService.users.subscribe((users) => (this.users = users));
    this.globalService.baseUserObserver.subscribe((value) => {
      this.baseUser = value;
    });

    this.user = this.users.find((user) => user.userId === this.userId)!;
  }

  follow(publisherId: number) {
    this.globalService.follow(publisherId);
  }
}
