import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormArray,
  Validators,
} from '@angular/forms';

import { GlobalService } from '../../services/global.service';

import { Theme } from '../../interfaces/models/themes.interface';
import { User } from '../../interfaces/models/user.interface';
import { Post } from '../../interfaces/models/post.interface';

@Component({
  selector: 'app-new-post-text',
  templateUrl: './new-post-text.component.html',
  styleUrls: ['./new-post-text.component.css'],
})
export class NewPostTextComponent implements OnInit {
  baseUser!: User;
  theme!: Theme;

  posts!: Post[];

  post!: Post;
  imageUrl!: string;

  form!: any;

  constructor(
    private router: Router,
    private globalService: GlobalService,
    formBuilder: FormBuilder
  ) {
    this.form = formBuilder.group({
      postId: [this.posts.length + 1],
      user: [this.baseUser],
      title: ['', Validators.required],
      caption: [''],
      imageUrl: [''],
      tags: new FormArray([]),
      likes: new FormArray([]),
      reblogs: new FormArray([]),
      replies: new FormArray([]),
      createdAt: [new Date()],
    });
  }

  ngOnInit(): void {
    this.globalService.theme.subscribe((value) => (this.theme = value));
    this.globalService.posts.subscribe((posts) => (this.posts = posts));
    this.globalService.baseUserObserver.subscribe((value) => {
      this.baseUser = value;
    });
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
    this.post = this.form.value;
    this.posts.push(this.post);
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
