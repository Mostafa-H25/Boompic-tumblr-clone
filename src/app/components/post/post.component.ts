import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';

import { GlobalService } from '../../services/global.service';

import { Theme } from '../../interfaces/models/themes.interface';
import { User } from '../../interfaces/models/user.interface';
import { Post } from '../../interfaces/models/post.interface';
import { LikedPost } from '../../interfaces/models/likedPosts.interface';
import { RebloggedPost } from '../../interfaces/models/rebloggedPosts.interface';
import { Reply } from '../../interfaces/models/reply.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit, AfterViewInit {
  @Input() post!: Post;
  @ViewChild('article') article!: ElementRef;
  baseUser!: User;
  posts!: Array<Post>;
  users!: Array<User>;
  theme!: Theme;
  articleWidth!: number;

  notesTotal!: number | undefined;
  likes!: Array<LikedPost>;
  reblogs!: Array<RebloggedPost>;
  replies!: Array<Reply>;

  postToDelete!: Post | null;

  isOptionsOpen: boolean = false;
  isNotesOpen: boolean = false;
  isExpandNotesSortingOpen: boolean = false;
  interactionTitle: string = '';

  sortOrFilterBy = {
    sortRepliesBy: ['Oldest First', 'Newest First'],
    filterReblogsBy: ['Comments and Tags', 'Tags Only', 'Other Reblogs'],
  };

  criterias!: string[];
  selectedCriteria!: string;

  constructor(public globalService: GlobalService) {}

  ngOnInit(): void {
    this.globalService.theme.subscribe((value) => (this.theme = value));
    this.globalService.users.subscribe((users) => (this.users = users));
    this.globalService.posts.subscribe((posts) => (this.posts = posts));
    this.globalService.baseUserObserver.subscribe((value) => {
      this.baseUser = value;
    });

    this.notesTotal =
      (this.post.likes?.size || 0) +
      (this.post.reblogs?.size || 0) +
      (this.post.replies?.size || 0);

    this.globalService.replies.subscribe(
      (replies) =>
        (this.replies = replies.filter(
          (reply) => reply.postId === this.post.postId
        ))
    );
    this.globalService.reblogs.subscribe(
      (reblogs) =>
        (this.reblogs = reblogs.filter(
          (reblog) => reblog.postId === this.post.postId
        ))
    );
    this.globalService.likes.subscribe(
      (likes) =>
        (this.likes = likes.filter((like) => like.postId === this.post.postId))
    );
  }

  ngAfterViewInit(): void {
    this.articleWidth = this.article.nativeElement.offsetWidth;
  }

  onSubmit(replyForm: NgForm) {
    let newReply = {
      replyId: this.replies.length + 1,
      postId: this.post.postId,
      user: this.baseUser,
      reply: replyForm.value.reply,
      createdAt: Date(),
    };

    this.replies.push(newReply);
    this.post.replies.add(newReply.replyId);
  }

  follow(publisherId: number) {
    this.globalService.follow(publisherId);
  }

  toggleOptions() {
    this.isOptionsOpen = !this.isOptionsOpen;
  }

  notesToggle() {
    this.isNotesOpen = !this.isNotesOpen;
  }

  expandToggle() {
    this.isExpandNotesSortingOpen = !this.isExpandNotesSortingOpen;
  }

  clickedOutside(button: string) {
    switch (button) {
      case 'options':
        this.isOptionsOpen = false;
        break;
      case 'expandNotesSorting':
        this.isExpandNotesSortingOpen = false;
        break;
    }
  }

  confirmDelete(postId: number) {
    this.postToDelete = this.posts.find((post) => post.postId === postId)!;
  }

  cancelDeletion() {
    this.postToDelete = null;
  }

  deletePost(postId: number) {
    this.posts = this.posts.filter((post) => post.postId !== postId);
    this.postToDelete = null;
  }

  likePost(postId: number) {
    let post = this.posts.find((post) => post.postId === postId);
    let like = this.likes.find(
      (likedPost) =>
        likedPost.postId === postId &&
        likedPost.user.userId === this.baseUser.userId
    )!;

    if (like) {
      let likeId = like.likeId;
      this.posts.forEach((post, index) => {
        if (post.postId === postId) {
          this.posts[index].likes?.delete(likeId);
        }
      });

      this.likes = this.likes.filter(
        (likedPost) => likedPost.likeId !== likeId
      );
    } else {
      let newLike = {
        likeId: this.likes.length + 1,
        postId: postId,
        user: this.baseUser,
      };
      this.likes.push(newLike);

      this.posts.forEach((post, index) => {
        if (post.postId === postId) {
          this.posts[index].likes?.add(newLike.likeId);
        }
      });
    }
  }

  replyToPost(postId: number, reply: string) {
    let newReply = {
      replyId: 30,
      postId: postId,
      user: this.baseUser,
      reply: reply,
      createdAt: Date(),
    };
    this.replies.push(newReply);

    this.posts.forEach((post, index) => {
      if (post.postId === postId) {
        this.posts[index].replies?.add(newReply.replyId);
      }
    });
  }

  deleteReply(postId: number, replyId: number) {
    let reply = this.replies.find((reply) => reply.replyId === replyId);
    if (reply?.user.userId === this.baseUser.userId) {
      this.posts.forEach((post, index) => {
        if (post.postId === postId) {
          this.posts[index].replies?.delete(replyId);
        }
      });
      this.replies = this.replies.filter((reply) => reply.replyId !== replyId);
    }
  }

  reblogPost(postId: number, caption: string) {
    let newReblog = {
      reblogId: 40,
      postId: postId,
      user: this.baseUser,
      caption: caption,
      createdAt: Date(),
    };
    this.reblogs.push(newReblog);

    this.posts.forEach((post, index) => {
      if (post.postId === postId) {
        this.posts[index].reblogs?.add(newReblog.reblogId);
      }
    });
  }

  deleteReblog(postId: number, reblogId: number) {
    let reblog = this.reblogs.find((reblog) => reblog.reblogId === reblogId);
    if (reblog?.user.userId === this.baseUser.userId) {
      this.posts.forEach((post, index) => {
        if (post.postId === postId) {
          this.posts[index].reblogs?.delete(reblogId);
        }
      });
      this.reblogs = this.reblogs.filter(
        (reblog) => reblog.reblogId !== reblogId
      );
    }
  }

  togglePostInteractions(interactionTitle: string, post: Post) {
    this.interactionTitle = interactionTitle;
    if (interactionTitle === 'replies')
      this.criterias = this.sortOrFilterBy.sortRepliesBy;
    if (interactionTitle === 'reblogs')
      this.criterias = this.sortOrFilterBy.filterReblogsBy;
    this.selectedCriteria = this.criterias[0];
  }

  selectCriteria(criteria: string) {
    this.selectedCriteria = criteria;
  }

  copyLink(postId: number) {
    let link = 'http://www.localhost:4200/dashboard/' + postId;
    navigator.clipboard.writeText(link);
  }
}
