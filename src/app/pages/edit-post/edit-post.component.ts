import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';

import { GlobalService } from '../../services/global.service';

import { Post } from '../../interfaces/models/post.interface';
import { User } from '../../interfaces/models/user.interface';
import { Theme } from '../../interfaces/models/themes.interface';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit {
  theme!: Theme;
  baseUser!: User;

  posts!: Array<Post>;
  users!: Array<User>;

  postId!: number;
  postToEdit!: Post;
  imageUrl!: string;

  form: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private globalService: GlobalService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      postId: [],
      user: [],
      title: [],
      caption: [],
      imageUrl: [],
      tags: new FormArray([]),
      likes: new FormArray([]),
      reblogs: new FormArray([]),
      replies: new FormArray([]),
      createdAt: [],
    });
  }

  ngOnInit(): void {
    this.globalService.theme.subscribe((value) => (this.theme = value));
    this.globalService.users.subscribe((users) => (this.users = users));
    this.globalService.posts.subscribe((posts) => (this.posts = posts));
    this.globalService.baseUserObserver.subscribe((value) => {
      this.baseUser = value;
    });

    this.route.paramMap.subscribe((value) => {
      this.postId = Number(value.get('postId'));
    });

    this.postToEdit = this.posts.find((post) => {
      return post.postId === this.postId;
    })!;

    this.imageUrl = this.postToEdit.imageUrl!;

    this.form.controls['title'].setValue(this.postToEdit.title || '');
    this.form.controls['caption'].setValue(this.postToEdit.caption);
    this.form.controls['imageUrl'].setValue(this.postToEdit.imageUrl);
    this.postToEdit.tags.forEach((tag) => this.tags.push(new FormControl(tag)));
  }

  addTag(tag: HTMLInputElement) {
    this.tags.push(new FormControl(tag.value));
    tag.value = '';
  }

  previewImage(event: any) {
    if (event.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
    }
  }

  onSubmit() {
    this.postToEdit = this.form.value;
    let editedPostIndex = this.posts.findIndex(
      (post) => post.postId === this.postToEdit.postId
    );
    this.posts[editedPostIndex].title = this.postToEdit.title;
    this.posts[editedPostIndex].caption = this.postToEdit.caption;
    this.posts[editedPostIndex].imageUrl = this.postToEdit.imageUrl;
    this.posts[editedPostIndex].tags = this.postToEdit.tags;
    this.router.navigate(['']);
  }

  closePage() {
    this.globalService.closePage();
  }

  get title() {
    return this.form.get('title');
  }
  get caption() {
    return this.form.get('caption');
  }
  get tags() {
    return this.form.get('tags') as FormArray;
  }
}
