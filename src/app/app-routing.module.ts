import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthComponent } from './layouts/auth/auth.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { ClientComponent } from './layouts/client/client.component';
import { TokenGuard } from './guards/token.guard';
import { AuthGuard } from './guards/auth.guard';

const APP_ROUTES: Routes = [

  {
    path: '',
    // pathMatch: 'full',
    component: AuthComponent,
    loadChildren: './layouts/auth/auth.module#AuthLayoutModule'
  },
  {
    path: 'admin',
    canLoad: [TokenGuard, AuthGuard],
    component: AdminComponent,
    loadChildren: './layouts/admin/admin.module#AdminModule'
  },
  {
    path: 'home',
    canLoad: [TokenGuard, AuthGuard],
    component: ClientComponent,
    loadChildren: './layouts/client/client.module#ClientLayoutModule'
  }

  // { path: 'path2', component: Name2Component },
  // { path: 'path3', component: Name3Component },
  // { path: 'path4', component: Name4Component },
  // { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
