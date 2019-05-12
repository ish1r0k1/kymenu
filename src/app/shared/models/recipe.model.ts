export interface Recipe {
  id: string
  title: string
  ingredients?: string
  instructions?: string
  notes?: string
  tags: string[]
}

export interface RecipesStateModel {
  loading: boolean
  items: Recipe[]
  selectedItem: Recipe | undefined
}
