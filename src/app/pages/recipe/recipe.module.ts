import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { NgxsModule } from '@ngxs/store';
import { RecipeState } from 'src/app/shared/state/recipe.state';

@NgModule({
  declarations: [RecipeListComponent, RecipeDetailComponent],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    NgxsModule.forFeature([RecipeState])
  ]
})
export class RecipeModule { }
