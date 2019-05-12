import { Injectable } from '@angular/core'
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction
} from '@angular/fire/firestore'
import { defineBase } from '@angular/core/src/render3'
import { firestore } from 'firebase'
import { ObservedValueOf, Observable, OperatorFunction } from 'rxjs'
import { Recipe } from 'src/app/shared/models/recipe.model'
import { map } from 'rxjs/operators'

interface FirestoreRecipe {
  title: string
  ingredients?: string
  instructions?: string
  notes?: string
  tags: { [k: string]: boolean }
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(private afs: AngularFirestore) {
    const settings: firebase.firestore.Settings = {}
    afs.firestore.settings(settings)
  }

  public getRecipes(): Observable<Recipe[]> {
    return this.afs
      .collection<FirestoreRecipe>('recipes')
      .snapshotChanges()
      .pipe(this.mapToRecipes())
  }

  public getRecipeDetails(recipeId: string): Observable<Recipe> {
    return this.afs
      .doc<FirestoreRecipe>(`recipes/${recipeId}`)
      .valueChanges()
      .pipe(map(this.firestoreRecipetoRecipe))
  }

  private mapToRecipes(): OperatorFunction<
    DocumentChangeAction<FirestoreRecipe>[],
    Recipe[]
  > {
    return map(recipes => {
      return recipes.map(this.documentToRecipe)
    })
  }

  private documentToRecipe(document: DocumentChangeAction<any>): Recipe {
    const data = document.payload.doc.data()
    const id = document.payload.doc.id
    const tags = Object.keys(data.tags)
    return <Recipe>{ id, ...data, tags }
  }

  private firestoreRecipetoRecipe(firestoreRecipe: FirestoreRecipe): Recipe {
    const tags = Object.keys(firestoreRecipe)

    return <Recipe>{
      id: '',
      ...firestoreRecipe,
      tags
    }
  }

  public addRecipe(data: Recipe): Promise<any> {
    return this.afs.collection<Recipe>('recipes').add(data)
  }

  public removeRecipe(recipeId: string): Promise<any> {
    return this.afs.doc<Recipe>(`recipes/${recipeId}`).delete()
  }

  getAddRecipes(): Observable<Recipe[]> {
    return this.afs
      .collection<Recipe>('recipes')
      .stateChanges(['added'])
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

  getRemoveRecipe(): Observable<any> {
    return this.afs
      .collection<Recipe>('recipes')
      .stateChanges(['removed'])
      .pipe(map(actions => actions.map(a => a.payload.doc.id)))
  }
}
