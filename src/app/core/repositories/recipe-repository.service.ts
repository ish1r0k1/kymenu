import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { Store } from '@ngxs/store'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Recipe } from '../../shared/models/recipe.model'

@Injectable({
  providedIn: 'root'
})
export class RecipeRepositoryService {
  constructor(private afs: AngularFirestore, private store: Store) {}

  addRecipe(data: Recipe): Promise<any> {
    const recipeCollection = this.afs.collection<Recipe>('recipes')
    return recipeCollection.add(data)
  }

  removeRecipe(id: string): Promise<any> {
    const recipeDocument = this.afs.doc<Recipe>(`recipes/${id}`)
    return recipeDocument.delete()
  }

  getAddedRecipes(): Observable<Recipe[]> {
    return this.afs
      .collection<Recipe>('recipes')
      .stateChanges(['added'])
      .pipe(
        map(actions =>
          actions.map(a => {
            let recipe = a.payload.doc.data() as Recipe
            recipe.ingredients = a.payload.doc.id
            return recipe
          })
        )
      )
  }

  getRemoveRecipes(): Observable<any> {
    return this.afs
      .collection<Recipe>('recipes')
      .stateChanges(['removed'])
      .pipe(map(actions => actions.map(a => a.payload.doc.id)))
  }

  getUpdatedRecipes(): Observable<Recipe[]> {
    return this.afs
      .collection<Recipe>('recipes')
      .stateChanges(['modified'])
      .pipe(
        map(actions =>
          actions.map(a => {
            let recipe = a.payload.doc.data() as Recipe
            recipe.id = a.payload.doc.id
            return recipe
          })
        )
      )
  }
}
