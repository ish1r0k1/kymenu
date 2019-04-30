import { Recipe } from '../models/recipe.model'

export class GetRecipes {
  static readonly type = '[RECIPE] GetRecipes'
}

export class GetAddedRecipes {
  static readonly type = '[RECIPE] GetAddedRecipes'
}

export class GetUpdateRecipes {
  static readonly type = '[RECIPE] GetUpdateRecipes'
}

export class GetRemoveRecipes {
  static readonly type = '[RECIPE] GetRemoveRecipes'
}

export class AddRecipe {
  static readonly type = '[RECIPE] Add'

  constructor(public payload: Recipe) {}
}

export class UpdateRecipe {
  static readonly type = '[RECIPE] Update'

  constructor(public payload: Recipe) {}
}

export class RemoveRecipe {
  static readonly type = '[RECIPE] Remove'

  constructor(public recipeId: string) {}
}
