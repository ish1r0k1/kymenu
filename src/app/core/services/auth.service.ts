import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { AngularFireAuth } from '@angular/fire/auth'
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore'
import { Router } from '@angular/router'
import { auth } from 'firebase'

interface IUser {
  uid: string
  email: string
  photoURL: string
  displayName: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<IUser>

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<IUser>(`users/${user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      })
    )
  }

  googleLogin() {
    const provider = new auth.GoogleAuthProvider()
    return this.oAuthLogin(provider)
  }

  oAuthLogin(provider: any) {
    return this.afAuth.auth.signInWithPopup(provider).then(credential => {
      this.updateUserData(credential.user)
    })
  }

  updateUserData(user: firebase.User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    )

    const data: IUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }

    return userRef.set(data, { merge: true })
  }

  signOut() {
    this.afAuth.auth.signOut().then(_ => {
      this.router.navigate(['/'])
    })
  }
}
