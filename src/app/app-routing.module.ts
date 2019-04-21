import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { NotfoundComponent } from './notfound/notfound.component'
import { LoginComponent } from './components/login/login.component';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    loadChildren: './pages/dashboard/dashboard.module#DashboardModule',
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'recipes',
    loadChildren: './pages/recipe/recipe.module#RecipeModule'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '404',
    component: NotfoundComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
