import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { NgxsModule } from '@ngxs/store';
import { RecipesState } from 'src/app/shared/state/recipes.state';

@NgModule({
  declarations: [RecipeListComponent, RecipeDetailComponent],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    NgxsModule.forFeature([RecipesState])
  ]
})
export class RecipeModule { }
