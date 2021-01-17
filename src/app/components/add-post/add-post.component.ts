import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacadeService } from '../../facade.service';
import { Post } from '../../models/post';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
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

  get userId(): AbstractControl | null {
    return this.postForm.get('userId');
  }

  get title(): AbstractControl | null {
    return this.postForm.get('title');
  }

  get body(): AbstractControl | null {
    return this.postForm.get('body');
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

    // this.postForm.controls['title'].valueChanges
    //                                .pipe
    //   // wait didistinct values
    //                                ()
    //                                .subscribe(
    //                                  title => {
    //                                    console.log(title);
    //                                  },
    //                                  error => {}
    //                                );
  }

  addPost(post: Post): void {
    if (post.id) {
      this.facadeService.updatePost(post);
    } else {
      this.facadeService.addPost(post);
    }
  }
}

