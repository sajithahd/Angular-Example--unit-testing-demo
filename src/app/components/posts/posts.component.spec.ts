import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APIService } from '../../api/api.service';
import { FacadeService } from '../../facade.service';
import { LoggerService } from '../../services/logger.service';
import { StateService } from '../../state/state.service';

import { PostsComponent } from './posts.component';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostsComponent],
      providers: [FacadeService, StateService, APIService, HttpClient, HttpHandler, LoggerService]
    })
                 .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
