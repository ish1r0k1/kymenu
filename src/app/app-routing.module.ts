import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'dashboard'
}, {
  path: 'dashboard',
  loadChildren: './pages/dashboard/dashboard.module#DashboardModule'
}, {
  path: 'recipes',
  loadChildren: './pages/recipe/recipe.module#RecipeModule'
}, {
  path: '404',
  component: NotfoundComponent
}, {
  path: '**',
  redirectTo: '404'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
