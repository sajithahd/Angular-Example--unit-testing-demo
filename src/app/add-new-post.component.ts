import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacadeService } from './facade.service';
import { Post } from './models/post';

@Component({
  selector: 'add-new-post',
  template: `
    <div>Add new Post</div>
    <div class="post-capture-wrapper">
      <!-- Simple Form -->
      <!-- <div class="post-capture" *ngIf="post">
        <label>Post ID: </label> {{ post.id }}
        <input class="post-detail" [(ngModel)]="post.userId" />
        <input class="post-detail" [(ngModel)]="post.title" />
        <input class="post-detail" [(ngModel)]="post.body" />
      </div> -->

      <!-- Dynamic Form with validations -->
      <!-- <form #postForm="ngForm">
        <div class="post-capture" *ngIf="post">
          <label>Post ID: </label> {{ post.id }}
          <div>
            <label for="userId">User ID </label>
            <input
              id="userId"
              name="userId"
              #userId="ngModel"
              class="post-detail"
              [(ngModel)]="post.userId"
              required
              minlength="4"
            />
            <div *ngIf="userId.invalid && (userId.touched || userId.dirty)">
              <span *ngIf="userId.errors.required">
                Reured field
              </span>
              <span *ngIf="userId.errors.minlength">
                Min length
              </span>
            </div>
          </div>

          <div>
            <label for="title">Title</label>
            <input
              class="post-detail"
              [(ngModel)]="post.title"
              id="title"
              name="title"
              required
              #title="ngModel"
            />
            <div *ngIf="title.invalid && (title.dirty || title.touched)">
              <span *ngIf="title.errors.required">Required filed</span>
            </div>
          </div>
          <div>
            <label for="body">Body</label>
            <input
              class="post-detail"
              [(ngModel)]="post.body"
              name="body"
              id="body"
              #body="ngModel"
              required
            />

            <div
              *ngIf="postForm.invalid && (postForm.touched || postForm.dirty)"
            >
              <span *ngIf="body.errors.required"> Required Filed</span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          [disabled]="postForm.invalid"
          (click)="addPost(post)"
        >
          {{ addNew ? "Add" : "Update" }}
        </button>
      </form> -->

      <!-- Reactive Form with validations -->
      <form [formGroup]="postForm">
        <div>
          <label for="userId">User ID</label>
          <input
            class="post-detail"
            id="userId"
            name="userId"
            formControlName="userId"
          />
          <div *ngIf="userId.invalid && (userId.touched || userId.dirty)">
            Required filed
          </div>
        </div>
        <div>
          <label for="title">Title</label>
          <input
            class="post-detail"
            formControlName="title"
            id="title"
            name="title"
          />
          <div *ngIf="title.invalid && (title.touched || title.dirty)">
            <div *ngIf="title.errors.required">Required Filed</div>
          </div>
        </div>
        <div>
          <label for="body">Body</label>
          <input
            formControlName="body"
            class="post-detail"
            id="Body"
            name="body"
          />
          <div *ngIf="body.invalid && (title.touched || title.dirty)">
            <div *ngIf="body.errors.required">Required Filed</div>
          </div>
        </div>

        <button
          type="submit"
          [disabled]="postForm.invalid"
          (click)="addPost(postForm.value)"
        >
          Add
        </button>
      </form>
    </div>
    <div class="post">
      <div class="title">
        {{ addedPost?.id }}. {{ addedPost?.title }} by user
        {{ addedPost?.userId }}
      </div>
      {{ addedPost?.body }}
    </div>
  `,
  styles: [
    `
      .post-capture-wrapper {
        margin: 10px 0px;
        background: #eee;
        padding: 5px;
      }

      .post {
        padding: 5px;
        background: #ddd;
        margin: 3px;
      }

      .post-detail {
        display: block;
        margin: 3px;
      }
    `
  ]
})
export class AddNewPostComponent implements OnInit {
  addNew: boolean;
  post: Post;
  addedPost!: Post;
  updatedPost!: Post;

  postForm: FormGroup;

  constructor(
    private facadeService: FacadeService,
    private formbuilder: FormBuilder
  ) {
    this.addNew = true;
    this.post = new Post(0, 0, '', '');

    // let post: Post = {
    //   userId: 1,
    //   id: 1,
    //   title: "My test post",
    //   body: "My first post regaring the facade architecture for angular."
    // } as Post;
    // acadeService.addPost(this.addedPost);

    // New FormGroup based intialzing
    // this.postForm = new FormGroup({
    //   userId: new FormControl(this.post.userId, [Validators.required]),
    //   title: new FormControl(this.post.title, [Validators.required]),
    //   body: new FormControl(this.post.body, [Validators.required])
    // });

    // FormBuilder based intialzing
    this.postForm = formbuilder.group({
      userId: [this.post.userId, Validators.required],
      title: [this.post.title, Validators.required],
      body: [this.post.body, Validators.required]
    });
  }

  ngOnInit(): void {
    this.facadeService.getAddedPost$().subscribe(
      addedPost => {
        this.addNew = true;
        this.addedPost = addedPost;
      },
      error => {}
    );

    this.facadeService.getUpdatedPost$().subscribe(
      updatedPost => {
        this.addNew = false;
        this.post = updatedPost;

        // FormBuilder based intialzing
        this.postForm = this.formbuilder.group({
          userId: [this.post.userId, Validators.required],
          title: [this.post.title, Validators.required],
          body: [this.post.body, Validators.required]
        });
      },
      error => {}
    );

    this.postForm.controls['title'].valueChanges
                                   .pipe
      // wait didistinct values
                                   ()
                                   .subscribe(
                                     title => {
                                       console.log(title);
                                     },
                                     error => {}
                                   );
  }

  addPost(post: Post): void {
    if (post.id) {
      this.facadeService.updatePost(post);
    } else {
      this.facadeService.addPost(post);
    }
  }

  get userId(): AbstractControl | null {
    return this.postForm.get('userId');
  }

  get title(): AbstractControl | null {
    return this.postForm.get('title');
  }

  get body(): AbstractControl | null {
    return this.postForm.get('body');
  }
}
