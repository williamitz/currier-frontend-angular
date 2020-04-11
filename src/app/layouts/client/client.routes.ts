import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from '../../pages/client/home/home.component';
import { CurrierServicesComponent } from '../../pages/client/currier-services/currier-services.component';



export const CLIENT_ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'services', component: CurrierServicesComponent },
  // { path: 'path2', component: Name2Component },
  // { path: 'path3', component: Name3Componen5t },
  // { path: 'path4', component: Name4Component },
  // { path: '**', component: PageNotFoundComponent },

];

