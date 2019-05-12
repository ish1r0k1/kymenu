import { Action, Selector, State, StateContext, Store } from '@ngxs/store'
import { tap } from 'rxjs/operators'
import { RecipeService } from 'src/app/core/services/recipe.service'
import {
  GetRecipeDetails,
  GetRecipes,
  AddRecipe,
  AddRecipeSuccess,
  AddRecipeFailure
} from '../actions/recipes.action'
import { Recipe, RecipesStateModel } from '../models/recipe.model'

@State<RecipesStateModel>({
  name: 'recipes',
  defaults: {
    loading: false,
    items: [],
    selectedItem: undefined
  }
})
export class RecipesState {
  @Selector()
  public static loading(state: RecipesStateModel): boolean {
    return state.loading
  }

  @Selector()
  public static recipes(state: RecipesStateModel): Recipe[] {
    return state.items
  }

  @Selector()
  public static selectedRecipe(state: RecipesStateModel): Recipe {
    return state.selectedItem
  }

  constructor(private store: Store, private recipeService: RecipeService) {}

  @Action(GetRecipes)
  getRecipes({ patchState }: StateContext<RecipesStateModel>) {
    patchState({ loading: true, items: [] })

    return this.recipeService
      .getRecipes()
      .pipe(tap(recipes => patchState({ items: recipes, loading: false })))
  }

  @Action(GetRecipeDetails)
  getRecipeDetails(
    { patchState }: StateContext<RecipesStateModel>,
    { recipeId }: GetRecipeDetails
  ) {
    patchState({ loading: true, selectedItem: undefined })

    return this.recipeService
      .getRecipeDetails(recipeId)
      .pipe(tap(result => patchState({ loading: false, selectedItem: result })))
  }

  @Action(AddRecipe)
  addRecipe(ctx: StateContext<RecipesStateModel>, { payload }: AddRecipe) {
    this.recipeService
      .addRecipe({ ...payload })
      .then(() => ctx.dispatch(new AddRecipeSuccess()))
      .catch(reject => ctx.dispatch(new AddRecipeFailure(reject)))
  }

  @Action(AddRecipeSuccess)
  addAddRecipeSuccess(ctx: StateContext<RecipesStateModel>) {
    ctx.patchState({ items: ctx.getState().items })
  }

  @Action(AddRecipeFailure)
  addRecipeFailure(ctx: StateContext<RecipesStateModel>) {
    ctx.patchState({ items: ctx.getState().items })
  }
}
