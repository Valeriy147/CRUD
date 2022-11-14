import { PostComponent } from './components/post/post.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'post/:id', component: PostComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
