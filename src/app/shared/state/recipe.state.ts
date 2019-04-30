import { Recipe, RecipeStateModel } from '../models/recipe.model'
import { State, Selector, Action, StateContext } from '@ngxs/store'
import { RecipeRepositoryService } from '../../core/repositories/recipe-repository.service'
import {
  AddRecipe,
  RemoveRecipe,
  GetAddedRecipes,
  GetUpdateRecipes,
  GetRemoveRecipes
} from '../actions/recipe.action'

@State<RecipeStateModel>({
  name: 'recipes',
  defaults: {
    recipes: []
  }
})
export class RecipeState {
  constructor(private recipeRepo: RecipeRepositoryService) {}

  @Selector() static getRecipes(state: RecipeStateModel) {
    return state.recipes
  }

  @Action(AddRecipe)
  add({ getState }: StateContext<RecipeStateModel>, { payload }: AddRecipe) {
    const state = getState()

    this.recipeRepo.addRecipe({ ...payload }).then(
      () => console.log('allIsOk'),
      err => {
        throw new Error(err)
      }
    )
  }

  @Action(RemoveRecipe)
  remove(ctx: StateContext<RecipeStateModel>, { recipeId }: RemoveRecipe) {
    this.recipeRepo.removeRecipe(recipeId).then(
      () => console.log('allIsOk'),
      err => {
        throw new Error(err)
      }
    )
  }

  @Action(GetAddedRecipes)
  GetAddedRecipes({ getState, patchState }: StateContext<RecipeStateModel>) {
    this.recipeRepo.getAddedRecipes().subscribe(recipeList => {
      const state = getState()
      patchState({
        recipes: [...state.recipes, ...recipeList]
      })
    })
  }

  @Action(GetUpdateRecipes)
  updatedRecipes({ getState, patchState }: StateContext<RecipeStateModel>) {
    this.recipeRepo.getUpdatedRecipes().subscribe(recipeList => {
      recipeList.forEach(updatedRecipe => {
        patchState({
          recipes: getState().recipes.map(recipe => {
            if (recipe.id === updatedRecipe.id) {
              return updatedRecipe
            } else return recipe
          })
        })
      })
    })
  }

  @Action(GetRemoveRecipes)
  removeRecipes({ getState, patchState }: StateContext<RecipeStateModel>) {
    this.recipeRepo.getRemoveRecipes().subscribe(recipeIds => {
      recipeIds.forEach(recipeId => {
        patchState({
          recipes: getState().recipes.filter(recipe => recipe.id !== recipeId)
        })
      })
    })
  }
}
