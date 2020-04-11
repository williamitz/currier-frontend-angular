import { Routes } from '@angular/router';


import { LoginComponent } from '../../pages/auth/login/login.component';
import { SinginComponent } from '../../pages/auth/singin/singin.component';

export const AUTH_ROUTES: Routes = [
  { path: '', component: LoginComponent },
  { path: 'singin', component: SinginComponent },
  // { path: 'path2', component: Name2Component },
  // { path: 'path3', component: Name3Component },
  // { path: 'path4', component: Name4Component },
  // { path: '**', component: PageNotFoundComponent },

];

