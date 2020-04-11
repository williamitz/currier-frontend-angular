import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AUTH_ROUTES } from './auth.routes';
import { LoginComponent } from '../../pages/auth/login/login.component';
import { SinginComponent } from '../../pages/auth/singin/singin.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    LoginComponent,
    SinginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild( AUTH_ROUTES ),
    FormsModule,
    HttpClientModule
   ],
  exports: [],
  providers: [],
})
export class AuthLayoutModule {}
