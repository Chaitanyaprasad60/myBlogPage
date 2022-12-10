import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentsSectionComponent } from './comments-section/comments-section.component';
import { Demo1Component } from './demo1/demo1.component';
import { EditorComponent } from './editor/editor.component';
import { HomeComponent } from './home/home.component';
import { ResumeComponent } from './resume/resume.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'comments',
    component: CommentsSectionComponent
  },
  {
    path: 'resume',
    component: ResumeComponent
  },
  {
    path: 'editor',
    component: EditorComponent
  },{
    path: 'demo1',
    component: Demo1Component
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
