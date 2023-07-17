import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/interfaces/models/post.interface';
import { Theme } from 'src/app/interfaces/models/themes.interface';
import { User } from 'src/app/interfaces/models/user.interface';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-profile-side-column',
  templateUrl: './profile-side-column.component.html',
  styleUrls: ['./profile-side-column.component.css'],
})
export class ProfileSideColumnComponent {
  baseUser!: User;
  posts!: Array<Post>;
  users!: Array<User>;
  theme!: Theme;

  newUsers!: Array<User> | any;
  email: string | null = '';

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

    this.newUsers = this.getFollowing();
    this.newUsers = this.newUsers.slice(0, 5);
  }

  follow(publisherId: number) {
    this.globalService.follow(publisherId);
  }

  getFollowing(): Array<User> {
    let followingArr: Set<number> = this.baseUser.following;
    this.newUsers = this.users.filter((user) => !followingArr.has(user.userId));
    this.newUsers = this.newUsers.filter(
      (user: any) => user.userId !== this.baseUser.userId
    );
    return this.newUsers;
  }

  removePublisher(publisherId: number) {
    this.newUsers = this.getFollowing();
    this.newUsers = this.newUsers.filter(
      (user: any) => user.userId !== publisherId
    );
    this.newUsers = this.newUsers.slice(0, 5);
    return this.newUsers;
  }

  changeBlogs(changedUsers: Array<User>) {
    let changedUsersIdArr = changedUsers.map((user) => user.userId);
    this.newUsers = this.getFollowing();
    this.newUsers = this.newUsers.filter(
      (user: any) => !changedUsersIdArr.includes(user.userId)
    );
    this.newUsers = this.newUsers.slice(0, 5);
    return this.newUsers;
  }
}
