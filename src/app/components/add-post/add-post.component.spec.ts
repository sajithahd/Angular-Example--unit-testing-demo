import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, defer } from 'rxjs';
import { FacadeService } from '../../facade.service';
import { Post } from '../../models/post';
import { PostsComponent } from '../posts/posts.component';

import { AddPostComponent } from './add-post.component';

xdescribe('AddPostComponent', () => {
  let component: AddPostComponent;
  let fixture: ComponentFixture<AddPostComponent>;

  let facadeServiceSpy: jasmine.SpyObj<FacadeService>;
  let formBuilderSpy: jasmine.SpyObj<FormBuilder>;
  let postForm: FormGroup;

  const expectedUpdatedPosts: Post = {
    userId: 1,
    id: 1,
    title: 'sajitha',
    body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
  };

  beforeEach(async () => {
    const facadeServiceSpyValue = jasmine.createSpyObj('FacadeService', [
      'getUpdatedPost$',
      'getAddedPost$'
    ]);
    const formBuilderSpyValue = jasmine.createSpyObj('FormBuilder', ['group']);
    await TestBed.configureTestingModule({
      declarations: [AddPostComponent],
      providers: [
        {provide: FacadeService, useValue: facadeServiceSpyValue},
        {provide: FormBuilder, useValue: formBuilderSpyValue}
      ]
    }).compileComponents();

    facadeServiceSpy = TestBed.inject(FacadeService) as jasmine.SpyObj<FacadeService>;
    formBuilderSpy = TestBed.inject(FormBuilder) as jasmine.SpyObj<FormBuilder>;
    facadeServiceSpy.getUpdatedPost$.and.returnValue(new BehaviorSubject(expectedUpdatedPosts));
    facadeServiceSpy.getAddedPost$.and.returnValue(new BehaviorSubject(expectedUpdatedPosts));

    // postForm = formBuilderSpy.group(
    //   {
    //     userId: [expectedUpdatedPosts.userId, Validators.required],
    //     title: [expectedUpdatedPosts.title, Validators.required],
    //     body: [expectedUpdatedPosts.body, Validators.required]
    //   });
    //
    // spyOnProperty(postForm, 'userId').and.returnValue(
    //   'dummy stubbed name'
    // );

  });

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(AddPostComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('should create', waitForAsync(() => {
    fixture.whenStable().then(() => {
      component.postForm = formBuilderSpy.group(
        {
          userId: [expectedUpdatedPosts.userId, Validators.required],
          title: [expectedUpdatedPosts.title, Validators.required],
          body: [expectedUpdatedPosts.body, Validators.required]
        });

      fixture.detectChanges();
      expect(component).toBeTruthy();
    });
  }));

  xit('should display updated posts', () => {

    facadeServiceSpy.updatePost(expectedUpdatedPosts);

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const updatedPostContainer = fixture.nativeElement.querySelector('.title');
      expect(updatedPostContainer.textContent).toContain('sajitha');
    });

  });
});

describe('AddPostComponent2', () => {

  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;

  const expectedUpdatedPost: Post = {
    userId: 1,
    id: 1,
    title: 'sajitha',
    body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
  };

  const expectedAddedPost: Post = {
    userId: 1,
    id: 1,
    title: 'sajitha',
    body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
  };

  function asyncData<T>(data: T) {
    return defer(() => Promise.resolve(data));
  }

  function createComponent() {
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    return fixture.whenStable().then(() => {
      // 2nd change detection displays the async-fetched details
      fixture.detectChanges();
    });
  }

  class FormBuilderSpy {
    testTheme: any = {
      primaryColor: '#5a5a71',
      accentColor: '#efeff1',
      warnColor: '#f44336'
    };

    /* emit cloned test theme */
    getTheme$ = jasmine.createSpy('getTheme$').and.callFake(
      () => asyncData(Object.assign({}, this.testTheme)));

  }

  class FacadeServiceSpy {

    getUpdatedPost$ = jasmine.createSpy('getUpdatedPost$').and.callFake(
      () => asyncData(Object.assign({}, expectedUpdatedPost as Post)));

    getAddedPost$ = jasmine.createSpy('getAddedPost$').and.callFake(
      () => asyncData(Object.assign({}, expectedAddedPost as Post)));

    loadPosts = jasmine.createSpy('loadPosts');

  }

  beforeEach(waitForAsync(() => {
    TestBed
      .configureTestingModule({

        providers: [
          {provide: FacadeService, useValue: {}},
          {provide: FormBuilder, useValue: {}}
        ]
      })

      // Override component's own provider
      .overrideComponent(
        PostsComponent,
        {
          set:
            {
              providers: [
                {provide: FacadeService, useClass: FacadeServiceSpy},
                {provide: FormBuilder, useClass: FormBuilderSpy}
              ]
            }
        }
      )

      .compileComponents();

  }));

  let formBuilderSpy: FormBuilderSpy;
  let facadeServiceSpy: FacadeServiceSpy;

  beforeEach(waitForAsync(() => {
    createComponent();
    formBuilderSpy = fixture.debugElement.injector.get(FormBuilder) as any;
    facadeServiceSpy = fixture.debugElement.injector.get(FacadeService) as any;
  }));

  it('should have called `getAddedPost$`', waitForAsync(() => {
    expect(facadeServiceSpy.getAddedPost$.calls.count()).toBe(1, 'getAddedPost$ called once');
  }));

  it('should have called `getUpdatedPost$`', waitForAsync(() => {
    expect(facadeServiceSpy.getUpdatedPost$.calls.count()).toBe(1, 'getAddedPost$ called once');
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


