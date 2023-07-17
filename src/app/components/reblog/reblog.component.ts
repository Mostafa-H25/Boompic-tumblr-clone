import { Component, Input } from '@angular/core';

import { GlobalService } from '../../../app/services/global.service';

import { Theme } from '../../interfaces/models/themes.interface';
import { User } from '../../interfaces/models/user.interface';
import { Post } from '../../interfaces/models/post.interface';
import { RebloggedPost } from '../../interfaces/models/rebloggedPosts.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reblog',
  templateUrl: './reblog.component.html',
  styleUrls: ['./reblog.component.css'],
})
export class ReblogComponent {
  @Input() reblogs!: Array<RebloggedPost>;
  @Input() post!: Post;
  baseUser!: User;
  theme!: Theme;

  isOptionsOpen: boolean = false;

  constructor(public globalService: GlobalService) {}

  ngOnInit(): void {
    this.globalService.theme.subscribe((value) => (this.theme = value));
    this.globalService.baseUserObserver.subscribe((value) => {
      this.baseUser = value;
    });
  }

  toggleOptions() {
    this.isOptionsOpen = !this.isOptionsOpen;
  }

  clickedOutside(button: string) {
    switch (button) {
      case 'options':
        this.isOptionsOpen = false;
        break;
    }
  }
}
