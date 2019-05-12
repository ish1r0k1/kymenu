import { Recipe } from "../models/recipe.model";

export class GetRecipes {
  static readonly type = '[Recipes] Get recipes'
}

export class GetRecipeDetails {
  static readonly type = '[Recipes] Get recipe details'
  constructor(public recipeId: string) {}
}

export class GetAddedRecipes {
  static readonly type = '[Recipes] Get added recipes'
}

export class GetUpdateRecipes {
  static readonly type = '[Recipes] Get update recipes'
}

export class GetRemoveRecipes {
  static readonly type = '[Recipes] Get remove recipes'
}

export class AddRecipe {
  static readonly type = '[Recipes] Add recipe'

  constructor(public payload: Recipe) {}
}

export class UpdateRecipe {
  static readonly type = '[Recipes] Update recipe'

  constructor(public payload: Recipe) {}
}

export class RemoveRecipe {
  static readonly type = '[Recipes] Remove recipe'

  constructor(public recipeId: string) {}
}

export class AddRecipeSuccess {
  static readonly type = '[Recipes] Add recipe success'
}

export class AddRecipeFailure {
  static readonly type = '[Recipes] Add recipe failure'
  constructor(public errro: any) {}
}
