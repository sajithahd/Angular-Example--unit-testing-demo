import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { APIService } from './api/api.service';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PostsComponent } from './components/posts/posts.component';
import { FacadeService } from './facade.service';
import { StateService } from './state/state.service';
import { AddPostComponent } from './components/add-post/add-post.component';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, AppRoutingModule],
  declarations: [AppComponent, PostsComponent, AddPostComponent, AddPostComponent],
  bootstrap: [AppComponent],
  providers: [FacadeService, StateService, APIService]
})
export class AppModule {}
