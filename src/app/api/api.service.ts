import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "../models/post";

@Injectable()
export class APIService {
  constructor(private http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      charset: "UTF-8"
    })
  };

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(
      "https://jsonplaceholder.typicode.com/posts"
    ) as Observable<Post[]>;
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post(
      "https://jsonplaceholder.typicode.com/posts",
      post,
      this.httpOptions
    ) as Observable<Post>;
  }

  updatePost(post: Post): Observable<Post> {
    const url = "https://jsonplaceholder.typicode.com/posts/" + post.id;
    return this.http.put(url, post, this.httpOptions) as Observable<Post>;
  }
}
