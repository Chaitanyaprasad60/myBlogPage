import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentsSectionComponent } from './comments-section/comments-section.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path:'',
  component:HomeComponent
},
{ path:'home',
component:HomeComponent
},
{
  path:'comments',
  component:CommentsSectionComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
