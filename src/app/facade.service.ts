import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
        console.log('Error occurred while loading posts');
      }
    );
  }

  getAddedPost$(): Observable<Post> {
    return this.stateService.getAddedPost$();
  }

  setAddedPost(post: Post): void {
    this.stateService.setAddedPost(post);
  }

  addPost(post: Post): void {
    this.apiService.addPost(post).subscribe(
      (addedPost: Post) => {
        this.setAddedPost(addedPost);
      },
      error => {
        console.log('Error occured while adding new post');
      }
    );
  }

  getUpdatedPost$(): Observable<Post> {
    return this.stateService.getUpdatedPost$();
  }

  setUpdatedPost(post: Post): void {
    this.stateService.setUpdatedPost(post);
  }

  updatePost(post: Post): void {
    this.apiService.updatePost(post).subscribe(
      (updatedPost: Post) => {
        this.setUpdatedPost(updatedPost);
      },
      error => {
        console.log('Error occured while adding new post');
      }
    );
  }
}
