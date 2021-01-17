import { TestBed, waitForAsync } from '@angular/core/testing';
import { BehaviorSubject, Observable } from 'rxjs';
import { APIService } from './api/api.service';
import { FacadeService } from './facade.service';
import { Post } from './models/post';
import { StateService } from './state/state.service';

describe('FacadeService', () => {

  let apiServiceSpy: jasmine.SpyObj<APIService>;
  let stateServiceSpy: jasmine.SpyObj<StateService>;
  let facadeService: FacadeService;

  beforeEach(() => {
    const apiSpy = jasmine.createSpyObj('APIService', ['getPosts', 'addPost', 'updatePost']);
    const stateSpy = jasmine.createSpyObj('StateService', [
      'getPosts$',
      'setPosts',
      'getAddedPost$',
      'setAddedPost',
      'getUpdatedPost$',
      'setUpdatedPost'
    ]);

    TestBed.configureTestingModule(
      {
        providers: [
          FacadeService,
          {provide: APIService, useValue: apiSpy},
          {provide: StateService, useValue: stateSpy}
        ]
      }
    );
    facadeService = TestBed.inject(FacadeService);
    apiServiceSpy = TestBed.inject(APIService) as jasmine.SpyObj<APIService>;
    stateServiceSpy = TestBed.inject(StateService) as jasmine.SpyObj<StateService>;
  });

  it('#getPosts$ should return stubbed value from a spy', waitForAsync(() => {
    const expectedPosts = [
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
    const postStub: Observable<Post[]> = new BehaviorSubject(expectedPosts);
    stateServiceSpy.getPosts$.and.returnValue(postStub);

    facadeService.getPosts$().subscribe(posts => {
      expect(posts).toEqual(expectedPosts);
    });
  }));

  it('#setPost should set stubbed value in the state', waitForAsync(() => {
    const postsToSet: Post[] = [
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

    facadeService.setPosts(postsToSet);

  }));

});
