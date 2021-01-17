import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FacadeService } from './facade.service';
import { Post } from './models/post';

@Component({
  selector: 'posts',
  template: `
    <div class="post" *ngFor="let post of posts$ | async">
      <div class="title">
        {{ post.id }}. {{ post.title }} by user {{ post.userId }}
      </div>
      {{ post.body }}
      <div>
        <button (click)="updatePost(post)">Update</button>
      </div>
    </div>
  `,
  styles: [
    `
      .title {
        font-weight: bold;
      }

      .post {
        padding: 5px;
        background: #ddd;
        margin: 3px;
      }
    `
  ]
})
export class PostsComponent implements OnInit {
  @Input() name!: string;

  posts$!: Observable<Post[]>;
  posts!: Post[];

  constructor(private facadeService: FacadeService) {
    facadeService.loadPosts();
  }

  ngOnInit(): void {
    this.posts$ = this.facadeService.getPosts$();
    // this.posts$.subscribe(
    //   posts => {
    //     this.posts = posts;
    //   },
    //   error => {
    //     console.log("Error occured while fetching posts");
    //   }
    // );
  }

  updatePost(post: Post): void {
    this.facadeService.updatePost(post);
  }
}
