import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieLandingComponent } from './movie-landing/movie-landing.component';


const routes: Routes = [{ path: '', component: MovieLandingComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
