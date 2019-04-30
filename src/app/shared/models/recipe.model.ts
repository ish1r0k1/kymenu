export abstract class RecipeModel {
  id?: string
  title: string
  ingredients?: string
  instructions?: string
  notes?: string
  tags: { [k: string]: boolean }
}

export interface Recipe extends RecipeModel {}

export interface RecipeStateModel {
  recipes: Recipe[]
}

export interface Recipe extends RecipeStateModel {}
