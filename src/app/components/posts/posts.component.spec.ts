import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { FacadeService } from '../../facade.service';
import { Post } from '../../models/post';

import { PostsComponent } from './posts.component';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let facadeServiceSpy: jasmine.SpyObj<FacadeService>;

  const expectedPosts: Post[] = [
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

  beforeEach(async () => {
    const facadeServiceSpyValue = jasmine.createSpyObj('FacadeService', ['getPosts$', 'loadPosts', 'updatePost']);

    await TestBed.configureTestingModule({
      declarations: [PostsComponent],
      providers: [{provide: FacadeService, useValue: facadeServiceSpyValue}]
    }).compileComponents();

    facadeServiceSpy = TestBed.inject(FacadeService) as jasmine.SpyObj<FacadeService>;
    facadeServiceSpy.getPosts$.and.returnValue(new BehaviorSubject(expectedPosts));

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display posts', () => {

    // fixture.whenStable().then(() => {
    //   fixture.detectChanges();
    //   const postContainer = fixture.nativeElement.querySelector('.post');
    //   expect(postContainer.textContent).toContain('sunt aut facere');
    // });

    const postContainer = fixture.nativeElement.querySelector('.post');
    expect(postContainer.textContent).toContain('sunt aut facere');

  });

});
