import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthenticatedGuard } from './guards/authenticated.guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireAuthModule
  ],
  providers: [AuthenticatedGuard]
})
export class CoreModule { }
