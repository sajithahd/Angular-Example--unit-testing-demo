import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AddNewPostComponent } from './add-new-post.component';
import { APIService } from './api/api.service';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FacadeService } from './facade.service';
import { PostsComponent } from './posts.component';
import { StateService } from './state/state.service';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, AppRoutingModule],
  declarations: [AppComponent, PostsComponent, AddNewPostComponent],
  bootstrap: [AppComponent],
  providers: [FacadeService, StateService, APIService]
})
export class AppModule {}
