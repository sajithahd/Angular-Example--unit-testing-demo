import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FacadeService } from '../../facade.service';
import { Post } from '../../models/post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
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

