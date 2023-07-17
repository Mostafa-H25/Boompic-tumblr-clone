import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ClickedOutsideDirective } from './directives/clicked-outside.directive';

import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';

import { HomeComponent } from './pages/home/home.component';
import { FollowingComponent } from './pages/following/following.component';
import { ForYouComponent } from './pages/for-you/for-you.component';
import { HubsComponent } from './pages/hubs/hubs.component';
import { ExploreTodayComponent } from './pages/explore-today/explore-today.component';
import { SearchComponent } from './pages/search/search.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NewPostComponent } from './pages/new-post/new-post.component';
import { EditPostComponent } from './pages/edit-post/edit-post.component';
import { NewPostTextComponent } from './pages/new-post-text/new-post-text.component';
import { ErrorComponent } from './pages/error/error.component';

import { HeaderComponent } from './components/header/header.component';
import { SliderComponent } from './components/slider/slider.component';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { SideColumnComponent } from './components/side-column/side-column.component';
import { PostComponent } from './components/post/post.component';
import { ReplyComponent } from './components/reply/reply.component';
import { ReblogComponent } from './components/reblog/reblog.component';
import { ProfileHeaderComponent } from './components/profile-header/profile-header.component';
import { ProfilePostsComponent } from './components/profile-posts/profile-posts.component';
import { ProfileFollowingComponent } from './components/profile-following/profile-following.component';
import { ProfileSideColumnComponent } from './components/profile-side-column/profile-side-column.component';

@NgModule({
  declarations: [
    AppComponent,

    HomeComponent,
    FollowingComponent,
    ForYouComponent,
    HubsComponent,
    ExploreTodayComponent,
    SearchComponent,
    PostDetailComponent,
    ProfileComponent,
    NewPostComponent,
    EditPostComponent,
    NewPostTextComponent,
    ErrorComponent,

    HeaderComponent,
    SliderComponent,
    DashboardHeaderComponent,
    SideColumnComponent,
    PostComponent,
    ReplyComponent,
    ReblogComponent,
    ProfileHeaderComponent,
    ProfilePostsComponent,
    ProfileFollowingComponent,
    ProfileSideColumnComponent,

    ClickedOutsideDirective,

    FilterPipe,
    SortPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
