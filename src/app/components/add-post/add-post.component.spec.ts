import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { FacadeService } from '../../facade.service';
import { Post } from '../../models/post';

import { AddPostComponent } from './add-post.component';

describe('AddPostComponent', () => {
  let component: AddPostComponent;
  let fixture: ComponentFixture<AddPostComponent>;

  let facadeServiceSpy: jasmine.SpyObj<FacadeService>;

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
    facadeServiceSpy.getUpdatedPost$.and.returnValue(new BehaviorSubject(expectedUpdatedPosts));
    facadeServiceSpy.getAddedPost$.and.returnValue(new BehaviorSubject(expectedUpdatedPosts));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display updated posts', () => {

    facadeServiceSpy.updatePost(expectedUpdatedPosts);

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const updatedPostContainer = fixture.nativeElement.querySelector('.title');
      expect(updatedPostContainer.textContent).toContain('sajitha');
    });

  });
});
