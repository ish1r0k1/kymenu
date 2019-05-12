import { AngularFireAuth } from '@angular/fire/auth'
import {
  Action,
  NgxsOnInit,
  Selector,
  State,
  StateContext,
  Store
} from '@ngxs/store'
import { auth } from 'firebase'
import { take, tap } from 'rxjs/operators'
import {
  CheckSession,
  LoginFaild,
  LoginSuccess,
  LoginWithGoogle,
  Logout,
  LogoutSuccess,
  LoginRedirect
} from '../actions/user.action'
import { AuthStateModel, User } from '../models/auth.model'
import { Navigate } from '@ngxs/router-plugin'

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    user: null,
    initialized: false
  }
})
export class AuthState implements NgxsOnInit {
  constructor(private afAuth: AngularFireAuth) {}

  @Selector()
  static getInitialized(state: AuthStateModel): boolean {
    return state.initialized
  }

  @Selector()
  static getUser(state: AuthStateModel) {
    return state.user
  }

  ngxsOnInit(ctx: StateContext<AuthStateModel>) {
    ctx.dispatch(new CheckSession())
  }

  @Action(CheckSession)
  checkSession(ctx: StateContext<AuthStateModel>) {
    return this.afAuth.authState.pipe(
      tap((user: User) => {
        if (user) {
          console.log(`CheckSession: ${user.displayName} is logged in`)
          ctx.dispatch(new LoginSuccess(user))
        } else {
          console.log('CheckSession: no user found')
        }

        ctx.patchState({ initialized: true })
      })
    )
  }

  @Action(LoginWithGoogle)
  loginWithGoogle(ctx: StateContext<AuthStateModel>) {
    const provider = new auth.GoogleAuthProvider()
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then((response: { user: User }) => {
        ctx.dispatch(new LoginSuccess(response.user))
      })
      .catch(error => {
        ctx.dispatch(new LoginFaild(error))
      })
  }

  @Action(Logout)
  Logout(ctx: StateContext<AuthStateModel>) {
    return this.afAuth.auth.signOut().then(_ => {
      ctx.dispatch(new LogoutSuccess())
    })
  }

  @Action(LoginSuccess)
  onLoginSuccess(ctx: StateContext<AuthStateModel>) {
    console.log('onLoginSuccess, navigating to /dashboard')
    ctx.dispatch(new Navigate(['/dashboard']))
  }

  @Action(LoginRedirect)
  onLoginRedirect(ctx: StateContext<AuthStateModel>) {
    console.log('onLoginRedirect, navigating to /auth/login')
    ctx.dispatch(new Navigate(['/login']))
  }

  @Action(LoginSuccess)
  setUserStateOnSuccess(
    ctx: StateContext<AuthStateModel>,
    event: LoginSuccess
  ) {
    const {
      user: { displayName, email, phoneNumber, photoURL, providerId, uid }
    } = event

    ctx.patchState({
      user: { displayName, email, phoneNumber, photoURL, providerId, uid }
    })
  }

  @Action([LoginFaild, LogoutSuccess])
  setUserStateOnFailure(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({
      user: null
    })
    ctx.dispatch(new LoginRedirect())
  }
}
