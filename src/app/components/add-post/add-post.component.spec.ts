import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { APIService } from '../../api/api.service';
import { FacadeService } from '../../facade.service';
import { LoggerService } from '../../services/logger.service';
import { StateService } from '../../state/state.service';

import { AddPostComponent } from './add-post.component';

describe('AddPostComponent', () => {
  let component: AddPostComponent;
  let fixture: ComponentFixture<AddPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPostComponent],
      providers: [FacadeService, StateService, FormBuilder, APIService, HttpClient, HttpHandler, LoggerService]
    })
                 .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
