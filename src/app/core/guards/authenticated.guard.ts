import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router'
import { Store } from '@ngxs/store'
import { Observable } from 'rxjs'
import { map, tap, filter, switchMap, take } from 'rxjs/operators'
import { LoginRedirect, CheckSession } from '../../shared/actions/user.action'
import { AuthState } from '../../shared/state/auth.state'

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(): Observable<boolean> {
    return this.store.select(AuthState.getInitialized).pipe(
      filter(initialized => initialized),
      take(1),
      switchMap(() =>
        this.store.selectOnce(AuthState.getUser).pipe(
          map(u => {
            if (!u) {
              this.store.dispatch(new LoginRedirect())
            }
            return true
          })
        )
      )
    )
  }
}
