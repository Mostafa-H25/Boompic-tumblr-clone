import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { NewPostComponent } from './pages/new-post/new-post.component';
import { NewPostTextComponent } from './pages/new-post-text/new-post-text.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { ErrorComponent } from './pages/error/error.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FollowingComponent } from './pages/following/following.component';
import { ForYouComponent } from './pages/for-you/for-you.component';
import { HubsComponent } from './pages/hubs/hubs.component';
import { ExploreTodayComponent } from './pages/explore-today/explore-today.component';
import { EditPostComponent } from './pages/edit-post/edit-post.component';
import { SearchComponent } from './pages/search/search.component';

const routes: Routes = [
  { path: 'edit/:postId', component: EditPostComponent },
  { path: 'new/text', component: NewPostTextComponent },
  { path: 'new', component: NewPostComponent },
  { path: 'search/:searchText', component: SearchComponent },
  { path: 'explore', component: ExploreTodayComponent },
  { path: 'dashboard/hubs', component: HubsComponent },
  { path: 'dashboard/for-you', component: ForYouComponent },
  { path: 'dashboard/following', component: FollowingComponent },
  { path: 'dashboard/:postId', component: PostDetailComponent },
  { path: 'dashboard', component: HomeComponent },
  { path: ':username', component: ProfileComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
