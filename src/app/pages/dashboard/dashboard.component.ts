import { Component } from '@angular/core'
import { Select, Store } from '@ngxs/store'
import { Observable } from 'rxjs'
import { AuthState } from 'src/app/shared/state/auth.state'
import { User } from '../../shared/models/auth.model'

@Component({
  selector: 'app-dashboard',
  template: `
    <p *ngIf="(user$ | async) as user">Welcome {{ user?.displayName }}</p>
  `,
  styles: []
})
export class DashboardComponent {
  @Select(AuthState.getUser)
  public user$: Observable<User>
}
