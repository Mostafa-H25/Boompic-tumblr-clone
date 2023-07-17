import { Component, OnInit } from '@angular/core';
import { NewPostStyle } from 'src/app/interfaces/models/newPostStyle.interface';
import { Theme } from 'src/app/interfaces/models/themes.interface';
import { User } from 'src/app/interfaces/models/user.interface';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css'],
})
export class DashboardHeaderComponent implements OnInit {
  newPostStyles!: NewPostStyle[];
  baseUser!: User;
  theme!: Theme;

  headerTabs = [
    { title: 'Following', link: '/dashboard/following' },
    { title: 'For You', link: '/dashboard/for-you' },
    { title: 'Your Tags', link: '/dashboard/hubs' },
    { title: 'Manage...', link: '/settings' },
  ];
  activeTab: any;
  constructor(public globalService: GlobalService) {}

  ngOnInit(): void {
    this.globalService.theme.subscribe((value) => (this.theme = value));
    this.globalService.baseUserObserver.subscribe((value) => {
      this.baseUser = value;
    });
    this.newPostStyles = this.globalService.newPostStyles;
    this.activeTab = !this.activeTab ? this.headerTabs[0] : this.activeTab;
  }

  toggleActiveTab(tabTitle: string) {
    this.activeTab = this.headerTabs.find((tab) => tab.title === tabTitle)!;
    console.log(this.activeTab);
  }
}
