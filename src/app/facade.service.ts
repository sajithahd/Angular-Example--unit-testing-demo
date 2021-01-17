import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { APIService } from './api/api.service';
import { Post } from './models/post';
import { StateService } from './state/state.service';

@Injectable()
export class FacadeService {
  constructor(
    private apiService: APIService,
    private stateService: StateService
  ) {}

  getPosts$(): Observable<Post[]> {
    return this.stateService.getPosts$();
  }

  setPosts(posts: Post[]): void {
    this.stateService.setPosts(posts);
  }

  loadPosts(): void {
    this.apiService.getPosts().subscribe(
      (posts: Post[]) => {
        this.setPosts(posts);
      },
      error => {
        console.log('Error occured while loading posts');
      }
    );
  }

  getAddedPost$(): Observable<Post> {
    return this.stateService.getAddedPost$();
  }

  setAddedPost(post: Post) {
    this.stateService.setAddedPost(post);
  }

  addPost(post: Post): void {
    this.apiService.addPost(post).subscribe(
      (post: Post) => {
        this.setAddedPost(post);
      },
      error => {
        console.log('Error occured while adding new post');
      }
    );
  }

  getUpdatedPost$(): Observable<Post> {
    return this.stateService.getUpdatedPost$();
  }

  setUpdatedPost(post: Post) {
    this.stateService.setUpdatedPost(post);
  }

  updatePost(post: Post): void {
    this.apiService.updatePost(post).subscribe(
      (post: Post) => {
        this.setUpdatedPost(post);

        // this.get
      },
      error => {
        console.log('Error occured while adding new post');
      }
    );
  }
}
