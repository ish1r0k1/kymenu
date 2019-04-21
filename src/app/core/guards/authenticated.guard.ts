import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router'
import { Store } from '@ngxs/store'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { LoginRedirect } from '../../shared/actions/user.action'
import { AuthState } from '../../shared/state/auth.state'

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(): Observable<boolean> {
    return this.store.selectOnce(AuthState.getUser).pipe(
      map(u => {
        if (!u) {
          this.store.dispatch(new LoginRedirect())
        }
        return true
      })
    )
  }
}
