import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Post } from '../models/post';
import { LoggerService } from '../services/logger.service';

@Injectable()
export class APIService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      charset: 'UTF-8'
    })
  };

  constructor(
    private http: HttpClient,
    private loggerService: LoggerService
  ) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(
      'https://jsonplaceholder.typicode.com/posts'
    ).pipe(tap(
      posts => this.loggerService.log(posts)
    )) as Observable<Post[]>;
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(
      'https://jsonplaceholder.typicode.com/posts',
      post,
      this.httpOptions
    ).pipe(tap(
      postAdded => this.loggerService.log(postAdded)
    )) as Observable<Post>;
  }

  updatePost(post: Post): Observable<Post> {
    const url = 'https://jsonplaceholder.typicode.com/posts/' + post.id;
    return this.http.put<Post>(url, post, this.httpOptions)
               .pipe(
                 tap(postUpdated => this.loggerService.log(postUpdated))
               ) as Observable<Post>;
  }
}
