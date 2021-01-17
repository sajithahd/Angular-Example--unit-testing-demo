import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Post } from '../models/post';
import { LoggerService } from '../services/logger.service';
import { APIService } from './api.service';

describe('API service', () => {

  let httpTestingController: HttpTestingController;
  let apiService: APIService;
  let loggerServiceSpy: jasmine.SpyObj<LoggerService>;

  beforeEach(() => {

    const loggerServiceSpyValue = jasmine.createSpyObj('LoggerService', ['log']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        APIService,
        {provide: LoggerService, useValue: loggerServiceSpyValue}
      ]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    loggerServiceSpy = TestBed.inject(LoggerService) as jasmine.SpyObj<LoggerService>;
    apiService = TestBed.inject(APIService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('#getPosts', () => {
    const posts: Post[] = [
      {
        userId: 1,
        id: 1,
        title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
      },
      {
        userId: 1,
        id: 2,
        title: 'qui est esse',
        body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla'
      },
      {
        userId: 1,
        id: 3,
        title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
        body: 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut'
      }
    ];

    it('should return posts array', () => {
      apiService.getPosts().subscribe(p => {
        expect(p).toEqual(posts, 'should return expected posts');
      });

      // apiService.getPosts().subscribe(p => {
      //   expect(p).toEqual(posts, 'should return expected posts');
      // });

      const req = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/posts');
      expect(req.request.method).toEqual('GET');
      req.flush(posts);

      // const testRequest = httpTestingController2.match('https://jsonplaceholder.typicode.com/posts');
      // expect(testRequest[0].request.method).toEqual('GET', 'request not found');
      // expect(testRequest.length).toEqual(1);
      // testRequest[0].flush(posts);

    });
  });

  describe('#addPost', () => {
    const post: Post = {
      userId: 1,
      id: null,
      title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
    };

    it('should add new post', () => {
      apiService.addPost(post).subscribe(addedPost => {
        expect(addedPost).toEqual(post);
        expect(addedPost.userId).toEqual(1);
      });

      const addPostRequest = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/posts');
      expect(addPostRequest.request.method).toEqual('POST');

      addPostRequest.flush(post);

    });
  });

  describe('#update post', () => {
    const updatingPost: Post = {
      userId: 1,
      id: 1,
      title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
    };

    it('should update post', () => {
        apiService.updatePost(updatingPost).subscribe(updatedPost => {
          expect(updatedPost).toEqual(updatingPost);
        });

        const updatePostRequest = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/posts/' + updatingPost.id);
        expect(updatePostRequest.request.method).toEqual('PUT');
        updatePostRequest.flush(updatingPost);
      }
    );
  });

});
